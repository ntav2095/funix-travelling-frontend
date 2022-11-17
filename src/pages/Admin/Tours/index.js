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

import "./override.css";

function Tours() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendDelete, isDeleting, deleteResult, deleteError] = useAxios();
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
    if (deleteResult) {
      alert(`Xóa thành công`);
      sendRequest(tourApi.get());
    }
  }, [deleteResult]);

  let errMsg = error ? error.message : null;

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
                    <td>
                      <div>STT</div>
                    </td>
                    <td>
                      <div>ID</div>
                    </td>
                    <td>
                      <div>Name</div>
                    </td>
                    <td>
                      <div>Actions</div>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {data.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <div>{(page - 1) * PAGE_SIZE + index + 1}</div>
                      </td>
                      <td>
                        <div>{item._id}</div>
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
                            Thêm/cập nhật lộ trình
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                className={styles.pagination + " toursPagination"}
                current={page}
                pageSize={PAGE_SIZE}
                total={data.metadata.total_count}
                onChange={(current, pageSize) => {
                  setPage(current);
                }}
              />
            </>
          )}

          {data && data.data.length === 0 && <h2>Hiện không có tour nào</h2>}

          <ErrorMessage msg={errMsg} />
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
