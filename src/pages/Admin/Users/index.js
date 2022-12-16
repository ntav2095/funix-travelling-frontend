import usePageTitle from "../../../hooks/usePageTitle";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";

function Users() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [changeRole, isChangingRole, changedRole, changingError] = useAxios();
  const [deleteUser, isDeleting, deleted, deletingError] = useAxios();

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
      alert("change role");
      sendRequest({
        method: "GET",
        url: "http://localhost:5000/user",
      });
    }
  }, [changedRole]);

  useEffect(() => {
    if (deleted) {
      alert("deleted");
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
      <AdminLayout>
        <StatusBar title="Quản lý users">
          <Link className="btn btn-primary" to="/admin/users/create-user">
            Tạo user mới
          </Link>
        </StatusBar>
        <div className={styles.container}>
          {users && (
            <table className="table">
              <thead>
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

              <tbody>
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
                        <Link
                          className="btn btn-sm btn-warning"
                          to={`/admin/users/change-password/${user.username}`}
                        >
                          Đổi password
                        </Link>

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
