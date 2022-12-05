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

import "./override.css";

function Tours() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendDelete, isDeleting, deleted, deleteError, deletingReset] =
    useAxios();
  const [page, setPage] = useState(1);

  const deleteHandler = (tourId) => {
    if (window.confirm("Bạn có chắc là muốn xóa không?")) {
      sendDelete(adminApis.tour.delete(tourId));
    }
  };

  useEffect(() => {
    sendRequest(tourApi.get({ page, page_size: PAGE_SIZE }));
  }, [page]);

  useEffect(() => {
    if (deleteError) {
      alert(`Có lỗi xảy ra: ${deleteError.message}`);
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleted) {
      deletingReset("data");
      alert(`Xóa thành công`);
      sendRequest(tourApi.get({ page, page_size: PAGE_SIZE }));
    }
  }, [deleted, page]);

  let errMsg = error ? error.message : null;

  usePageTitle("Danh sách tours | Admin | Travel Funix");

  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />
      <AdminLayout
        title="Danh sách tours"
        path="/admin/new-tour"
        text="New Tour"
      >
        <div className={styles.tours}>
          {data && data.data.length > 0 && (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      <div>STT</div>
                    </th>
                    <th>
                      <div>Mã tour</div>
                    </th>
                    <th>
                      <div>Tên tour</div>
                    </th>
                    <th>
                      <div>Chức năng</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
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
                        <div>{item.name}</div>
                      </td>
                      <td>
                        <div className={styles.actionBtns}>
                          <Link
                            to={`/admin/edit-tour/${item._id}`}
                            className={styles.editBtn}
                          >
                            Sửa
                          </Link>
                          <button
                            className={styles.removeTourBtn}
                            onClick={() => deleteHandler(item._id)}
                          >
                            Xóa
                          </button>
                          <Link
                            className={styles.editItineraryBtn}
                            to={`/admin/update-itinerary/${item._id}`}
                          >
                            Thêm/sửa lộ trình
                          </Link>
                        </div>
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

          {data && data.data.length === 0 && <h5>Hiện không có tour nào</h5>}

          <ErrorMessage msg={errMsg} />
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
