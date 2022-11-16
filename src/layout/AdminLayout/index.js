// main
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { removeUser } from "../../store/user.slice";

// css
import styles from "./AdminLayout.module.css";

const userSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

function AdminLayout({ children, title, path, text }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? styles.active : undefined;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1>Admin page</h1>

          {user && (
            <div>
              <p>
                {userSVG} <span>{user.username}</span>
              </p>

              <button onClick={logoutHandler}>Log out</button>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <ul className={styles.nav}>
            <li>
              <NavLink end className={navLinkClasses} to="/">
                Client page
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClasses} to="/admin/tours">
                Tours
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClasses} to="/admin/visa-products">
                Visa Products
              </NavLink>
            </li>
            <li>
              <Link to="/admin/posts">Posts</Link>
            </li>{" "}
            <li>
              <Link to="/admin/category">Category</Link>
            </li>
            {!user && (
              <li>
                <NavLink className={navLinkClasses} to="/admin/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h2 className={styles.title}>{title}</h2>
            {path && text && (
              <Link className={styles.navigateBtn} to={path}>
                {text}
              </Link>
            )}
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

export default AdminLayout;
