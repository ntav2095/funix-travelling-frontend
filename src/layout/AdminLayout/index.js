// main
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { removeUser } from "../../store/user.slice";
import { exit as exitSvg } from "../../assets/svgs";
import { useState } from "react";

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
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? styles.active : undefined;

  let sidebarClasses = styles.sidebar;
  if (hide) {
    sidebarClasses += " " + styles.hide;
  }
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={sidebarClasses}>
            {user && (
              <div className={styles.userInfo}>
                {userSVG}
                <p>{user.username}</p>
              </div>
            )}
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
                <NavLink className={navLinkClasses} to="/admin/posts">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/admin/category">
                  Category
                </NavLink>
              </li>{" "}
              <li>
                <NavLink className={navLinkClasses} to="/admin/manage-layout">
                  Manage Layout
                </NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink className={navLinkClasses} to="/admin/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>

            <div className={styles.logout}>
              {exitSvg}
              <button onClick={logoutHandler}>Log out</button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className="d-flex align-items-center">
                <button
                  className={styles.toggleBtn + " me-4"}
                  onClick={() => setHide((prev) => !prev)}
                >
                  {hide ? "show >>" : "<< hide"}
                </button>
                <h2 className={styles.title}>{title}</h2>
              </div>
              {path && text && (
                <Link className={styles.navigateBtn} to={path}>
                  {text}
                </Link>
              )}
            </div>
            <div className={styles.contentMain}>{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
