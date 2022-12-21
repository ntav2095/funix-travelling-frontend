// main
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

// hooks
import useAxios from "../../../hooks/useAxios";
import { visaApi } from "../../../services/apis";

// css
import styles from "./Visas.module.css";
import { useEffect } from "react";
import SpinnerModal from "../../../components/SpinnerModal";

function Visas() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [startDeleting, isDeleting, deleted, deletingError] = useAxios();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this visa product?")) {
      startDeleting(visaApi.deleteVisa(id));
    }
  };

  const ActionButtons = ({ id }) => {
    return (
      <>
        <Link
          className="btn btn-warning me-2"
          to={`/admin/edit-visa-product/${id}`}
        >
          Edit
        </Link>
        <button
          className="btn btn-danger me-2"
          onClick={() => deleteHandler(id)}
        >
          Remove
        </button>
      </>
    );
  };

  useEffect(() => {
    sendRequest(visaApi.getVisas());
  }, []);

  useEffect(() => {
    if (deleted) {
      alert("Deleted");
      sendRequest(visaApi.getVisas());
    }
  }, [deleted]);

  useEffect(() => {
    if (deletingError) {
      alert(`Failed to delete: ${deletingError.message.vi}`);
    }
  }, [deletingError]);

  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />
      <AdminLayout
        title="Sản phẩm visa"
        path="/admin/add-visa-product"
        text="New Visa "
      >
        <StatusBar title="Dịch vụ visa">
          <Link className="btn btn-primary" to="/admin/add-visa-product">
            Tạo sản phẩm visa
          </Link>
        </StatusBar>

        <div className={styles.container}>
          {data && data.items.length > 0 && (
            <table className="table table-bordered">
              <thead className="bg-dark text-light">
                <tr>
                  <th>
                    <div>STT</div>
                  </th>
                  <th>
                    <div>ID</div>
                  </th>
                  <th>
                    <div>Name</div>
                  </th>
                  <th>
                    <div>Country</div>
                  </th>
                  <th>
                    <div>Price</div>
                  </th>
                  <th>
                    <div>Action Buttons</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.items.map((visa, index) => (
                  <tr key={visa._id}>
                    <td>
                      <div>{index + 1}</div>
                    </td>
                    <td>
                      <div>{visa._id}</div>
                    </td>
                    <td>
                      <div>{visa.name}</div>
                    </td>
                    <td>
                      <div>{visa.country}</div>
                    </td>
                    <td>
                      <div>{visa.price}</div>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <ActionButtons id={visa._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data && data.items.length === 0 && (
            <h2 className={styles.noProducts}>No visa products</h2>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default Visas;
