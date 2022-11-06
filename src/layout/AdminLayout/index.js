import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../store/user.slice";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };
  return (
    <>
      <header className="adminLayout__header">
        <h1>Admin page {user && <span>({user.username})</span>}</h1>
      </header>

      <main className="adminLayout__main">
        <div className="adminLayout__sidebar">
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>{" "}
            <li>
              <Link to="/admin/tours">Tours</Link>
            </li>
            <li>
              <Link to="/admin/new-tour">New Tour</Link>
            </li>
            {user && (
              <li>
                <button onClick={logoutHandler}>Log out</button>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/admin/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="adminLayout__content">{children}</div>
      </main>
    </>
  );
}

export default AdminLayout;
