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
    <AdminLayout>
      <div className={styles.tours}>
        {data && data.items.length > 0 && (
          <table>
            <thead>
              <tr>
                <td>
                  <div>ID</div>
                </td>
                <td>
                  <div>Name</div>
                </td>
                <td>
                  <div>Journey</div>
                </td>
                <td>
                  <div>Actions</div>
                </td>
              </tr>
            </thead>

            <tbody>
              {data.items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.journey}</td>
                  <td>
                    <div>
                      <Link to={`/admin/edit-tour/${item._id}`}>Edit</Link>
                      <button>Remove</button>
                      <button>Add itinerary</button>
                      <button>Edit itinerary</button>
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
