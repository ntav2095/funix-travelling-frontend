import {
  // main
  useEffect,
  useState,
  Link,

  // components
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  Pagination,
  StatusBar,
  Filter,
  NotifyModal,

  // api
  useAxios,
  tourApis,

  // other
  PAGE_SIZE,
  usePageTitle,
  svg,
  styles,
} from "./import";

import "./Tours.override.css";

const checkMark = <span className={styles.checkSVG}>{svg.checkCircle}</span>;

function Tours() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendDelete, isDeleting, deleted, deleteError, deletingReset] =
    useAxios();
  const [confirmDelete, setConfirmDelete] = useState(null); // null | { tourId, tourCode }

  const [filter, setFilter] = useState({
    category: "",
    search: "",
    banner: "",
    page: 1,
  });

  const confirmDeleteHandler = (tourId, tourCode) => {
    // if (window.confirm("Bạn có chắc là muốn xóa không?")) {
    //   sendDelete(tourApis.delete(tourId));
    // }
    setConfirmDelete({ tourId, tourCode });
  };

  const query = { page: filter.page, page_size: PAGE_SIZE };
  if (filter.category) {
    query.cat = filter.category;
  }

  if (filter.search.trim()) {
    query.search = filter.search.trim();
  }

  if (filter.banner) {
    query.banner = filter.banner;
  }

  useEffect(() => {
    sendRequest(tourApis.get(query));
  }, [filter]);

  useEffect(() => {
    if (deleted || deleteError) {
      sendRequest(tourApis.get(query));
    }
  }, [deleted, deleteError]);

  // nếu xóa tour xong mà bị tụt 1 trang
  useEffect(() => {
    if (data && deleted) {
      if (data.metadata.page_count < filter.page) {
        setFilter((prev) => ({ ...prev, page: data.metadata.page_count }));
      }
    }
  }, [data, filter, deleted]);

  usePageTitle("Danh sách tours | Admin | Joya Travel");

  // handle notify modal
  let notify = {};
  if (deleted) {
    notify = {
      type: "success",
      message: "Xóa thành công",
      btn: {
        text: "OK",
        cb: () => {
          deletingReset();
        },
        component: "button",
      },
      onHide: () => {
        deletingReset();
      },
      time: 2000,
      show: deleted,
    };
  }

  if (deleteError) {
    notify = {
      type: "error",
      message: deleteError.message,
      btn: {
        text: "OK",
        cb: () => {
          deletingReset();
        },
        component: "button",
      },
      onHide: () => {
        deletingReset();
      },
      show: deleteError,
    };
  }

  if (confirmDelete) {
    notify = {
      type: "normal",
      message: `Bạn có chắc muốn xóa tour ${confirmDelete.tourCode} không?`,
      leftBtn: {
        text: "Có",
        cb: () => {
          sendDelete(tourApis.delete(confirmDelete.tourId));
          setConfirmDelete(null);
        },
        component: "button",
      },
      rightBtn: {
        text: "Không",
        cb: () => {
          setConfirmDelete(null);
        },
        component: "button",
      },
      onHide: () => {
        setConfirmDelete(null);
      },
      show: confirmDelete,
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <SpinnerModal show={isLoading || isDeleting} />

      <AdminLayout>
        <StatusBar title="Danh sách tours">
          <Link className="btn btn-primary btn-sm" to="/admin/new-tour">
            Tạo tour mới
          </Link>
        </StatusBar>

        <div className={styles.tours}>
          <Filter setFilter={setFilter} filter={filter} />

          {data && data.data.length > 0 && (
            <table className="table table-bordered ">
              <thead className="bg-dark text-light">
                <tr>
                  <th rowSpan={2}>
                    <div>STT</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Mã tour</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Tên tour</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Danh mục</div>
                  </th>
                  <th colSpan={3}>
                    <div className="text-center">Banner</div>
                  </th>
                  <th rowSpan={2}>
                    <div className="text-center">Chức năng</div>
                  </th>
                </tr>

                <tr>
                  <th>
                    <div>home</div>
                  </th>

                  <th>
                    <div>eu</div>
                  </th>

                  <th>
                    <div>vn</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.data.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div className="text-center">
                        {(filter.page - 1) * PAGE_SIZE + index + 1}
                      </div>
                    </td>
                    <td>
                      <div>{item.code}</div>
                    </td>
                    <td>
                      <div>{item.name}</div>
                    </td>
                    <td>
                      <div>
                        {item.category.includes("europe")
                          ? "Tour châu Âu"
                          : item.category.includes("vi")
                          ? "Tour trong nước"
                          : item.category.length > 0
                          ? "Khác"
                          : "Chưa phân loại"}
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.layout.includes("home-slider") && checkMark}
                      </div>
                    </td>
                    <td>
                      <div>{item.layout.includes("vn-tours") && checkMark}</div>
                    </td>
                    <td>
                      <div>{item.layout.includes("eu-tours") && checkMark}</div>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link
                          to={`/admin/edit-tour/${item._id}`}
                          className="btn btn-warning me-2"
                        >
                          Sửa
                        </Link>

                        <Link
                          className="btn btn-secondary me-2"
                          to={`/admin/update-itinerary/${item._id}`}
                        >
                          Sửa lộ trình
                        </Link>
                        <Link
                          className="btn btn-success me-2"
                          to={`/admin/rate-tour/${item._id}`}
                        >
                          Đánh giá
                        </Link>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() =>
                            confirmDeleteHandler(item._id, item.code)
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data && data.data.length > 0 && (
            <div className="pt-3 ps-1">
              <Pagination
                bgGreen
                current={filter.page}
                pageSize={PAGE_SIZE}
                total={data.metadata.total_count}
                onChange={(current, pageSize) => {
                  setFilter((prev) => ({ ...prev, page: current }));
                }}
              />
            </div>
          )}

          {data && data.data.length === 0 && <h5>Không có tour nào</h5>}

          {error && <ErrorMessage msg={error.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
