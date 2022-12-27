import {
  useEffect,
  useState,
  Link,
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  useAxios,
  tourApi,
  adminApis,
  styles,
  Pagination,
  PAGE_SIZE,
} from "./import";
import usePageTitle from "../../../hooks/usePageTitle";

import "./Tours.override.css";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import Filter from "./Filter";
import NotifyModal from "../../../components/NotifyModal";

const checkCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const checkMark = <span className={styles.checkSVG}>{checkCircle}</span>;

function ImageManager() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendDelete, isDeleting, deleted, deleteError, deletingReset] =
    useAxios();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "all",
    search: "",
    banner: "",
  });

  const deleteHandler = (tourId) => {
    if (window.confirm("Bạn có chắc là muốn xóa không?")) {
      sendDelete(adminApis.tour.delete(tourId));
    }
  };

  useEffect(() => {
    const reqQueries = { page, page_size: PAGE_SIZE };
    if (filter.category === "europe") {
      reqQueries.cat = "europe";
    }

    if (filter.category === "vi") {
      reqQueries.cat = "vi";
    }

    if (filter.search.trim()) {
      reqQueries.search = filter.search.trim();
    }

    if (filter.banner) {
      reqQueries.banner = filter.banner;
    }

    sendRequest(tourApi.get(reqQueries));
  }, [page, filter]);

  useEffect(() => {
    if (deleted) {
      sendRequest(tourApi.get({ page, page_size: PAGE_SIZE }));
    }
  }, [deleted, page]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    if (data && deleted) {
      if (data.metadata.page_count < page) {
        setPage(data.metadata.page_count);
      }
    }
  }, [data, page, deleted]);

  usePageTitle("Danh sách tours | Admin | Joya Travel");

  const showNotify = deleted || deleteError;
  const notifyType = deleted ? "success" : deleteError ? "error" : "";
  const notifyMessage = deleted
    ? "Xóa thành công"
    : deleteError?.message || "Có lỗi xảy ra";

  return (
    <>
      <NotifyModal
        type={notifyType}
        show={showNotify}
        message={notifyMessage}
        onHide={() => deletingReset()}
        time={1500}
      />

      <SpinnerModal show={isLoading || isDeleting} />

      <AdminLayout>
        <div className={styles.tours}>
          <Filter setFilter={setFilter} filter={filter} />

          {data && data.data.length > 0 && (
            <>
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
                          {(page - 1) * PAGE_SIZE + index + 1}
                        </div>
                      </td>
                      <td>
                        <div>{item.code}</div>
                      </td>
                      <td>
                        <Link to={`/admin/image-manager/${item._id}`}>
                          <div>{item.name}</div>
                        </Link>
                      </td>
                      <td>
                        <div>
                          {item.category.includes("europe")
                            ? "Tour châu Âu"
                            : item.category.includes("vi")
                            ? "Tour trong nước"
                            : "Chưa phân loại"}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("home-slider") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("vn-tours") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.layout.includes("eu-tours") && checkMark}
                        </div>
                      </td>
                      <td>
                        <div className={styles.actionBtns}></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-3 ps-1">
                <Pagination
                  bgGreen
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={data.metadata.total_count}
                  onChange={(current, pageSize) => {
                    setPage(current);
                  }}
                />
              </div>
            </>
          )}

          {data && data.data.length === 0 && <h5>Không có tour nào</h5>}

          {error && <ErrorMessage msg={error.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default ImageManager;
