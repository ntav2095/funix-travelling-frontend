// main
import { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// css
import styles from "./Tours.module.css";

function Tours() {
  const [sendRequest, isLoading, data, error] = useAxios();

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);
  return (
    <AdminLayout title="Danh sách tours">
      <div className={styles.tours}>
        {data && data.items.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
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
              {data.items.map((item) => (
                <tr key={item._id}>
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
      </div>
    </AdminLayout>
  );
}

export default Tours;
