// main
import { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// assets
import * as svg from "../../../assets/svgs";

// css
import styles from "./Tours.module.css";

function Tours() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendDelete, isDeleting, deleteResult, deleteError] = useAxios();

  const deleteHandler = (tourId) => {
    if (window.confirm("Bạn có chắc là muốn xóa không?")) {
      sendDelete(tourApi.delete(tourId));
    }
  };

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);

  useEffect(() => {
    if (deleteError) {
      alert(`Có lỗi xảy ra: ${deleteError.message.vi}`);
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleteResult) {
      alert(`Xóa thành công`);
      sendRequest(tourApi.get());
    }
  }, [deleteResult]);
  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />
      <AdminLayout title="Danh sách tours">
        <div className={styles.tours}>
          {data && data.items.length > 0 && (
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
                {data.items.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div>{index + 1}</div>
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
                          Edit
                        </Link>
                        <button
                          className={styles.removeTourBtn}
                          onClick={() => deleteHandler(item._id)}
                        >
                          Remove
                        </button>
                        <Link
                          className={styles.editItineraryBtn}
                          to={`/admin/update-itinerary/${item._id}`}
                        >
                          Update itinerary
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data && data.items.length === 0 && <h2>Hiện không có tour nào</h2>}

          {error && (
            <h2 className={styles.errorMessage}>
              {svg.exclamation} {error.message.vi}
            </h2>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
