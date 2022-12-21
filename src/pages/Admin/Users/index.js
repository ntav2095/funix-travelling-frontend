import usePageTitle from "../../../hooks/usePageTitle";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import SpinnerModal from "../../../components/SpinnerModal";
import { useSelector } from "react-redux";

function Users() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [changeRole, isChangingRole, changedRole, changingError] = useAxios();
  const [deleteUser, isDeleting, deleted, deletingError] = useAxios();
  const { user: auth } = useSelector((state) => state.user);

  const changeRoleHandler = (newRole, currentRole, username) => {
    if (currentRole !== newRole) {
      changeRole({
        method: "PUT",
        url: "http://localhost:5000/user/change-role",
        data: { username: username, role: newRole },
      });
    }
  };

  const deleteUserHandler = (username) => {
    if (window.confirm("Bạn có chắc không?")) {
      deleteUser({
        method: "DELETE",
        url: "http://localhost:5000/user",
        data: { username: username },
      });
    }
  };

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: "http://localhost:5000/user",
    });
  }, []);

  useEffect(() => {
    if (changedRole) {
      sendRequest({
        method: "GET",
        url: "http://localhost:5000/user",
      });
    }
  }, [changedRole]);

  useEffect(() => {
    if (deleted) {
      sendRequest({
        method: "GET",
        url: "http://localhost:5000/user",
      });
    }
  }, [deleted]);

  const users = data ? data.data : null;
  usePageTitle("Quản lý user");

  return (
    <>
      <SpinnerModal show={isLoading || isChangingRole || isDeleting} />
      <AdminLayout>
        <StatusBar title="Quản lý users">
          <Link className="btn btn-primary" to="/admin/users/create-user">
            Tạo user mới
          </Link>
        </StatusBar>

        <div className={styles.container}>
          <div className="auth mb-3 bg-light p-2 border">
            <p className="fs-5 mb-2 fw-bold">Tài khoản của bạn</p>
            <p className="mb-1">
              <span className="fw-bold">username:</span> {auth.username}
            </p>
            <p>
              {" "}
              <span className="fw-bold">role:</span> {auth.role}
            </p>
            <Link
              className="btn btn-sm btn-warning"
              to={`/admin/users/change-password/${auth.username}`}
            >
              Đổi password
            </Link>
          </div>

          {users && (
            <table className="table table-bordered">
              <thead className="bg-dark text-light text-center">
                <tr>
                  <th>
                    <div>_id</div>
                  </th>
                  <th>
                    <div>username</div>
                  </th>
                  <th>
                    <div>admin</div>
                  </th>
                  <th>
                    <div>moderator</div>
                  </th>
                  <th>
                    <div>client</div>
                  </th>
                  <th>
                    <div>actions</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div>{user._id}</div>
                    </td>
                    <td>
                      <div>{user.username}</div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          onChange={() =>
                            changeRoleHandler("admin", user.role, user.username)
                          }
                          checked={user.role === "admin"}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          onChange={() =>
                            changeRoleHandler(
                              "moderator",
                              user.role,
                              user.username
                            )
                          }
                          checked={user.role === "moderator"}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          onChange={() =>
                            changeRoleHandler(
                              "client",
                              user.role,
                              user.username
                            )
                          }
                          checked={
                            user.role !== "moderator" && user.role !== "admin"
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <button
                          onClick={() => deleteUserHandler(user.username)}
                          className="btn btn-sm btn-danger ms-2"
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
        </div>
      </AdminLayout>
    </>
  );
}

export default Users;
