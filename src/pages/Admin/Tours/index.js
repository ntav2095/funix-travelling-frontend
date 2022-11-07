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

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);
  return (
    <>
      <SpinnerModal show={isLoading} />
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
                        <button className={styles.removeTourBtn}>Remove</button>
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
