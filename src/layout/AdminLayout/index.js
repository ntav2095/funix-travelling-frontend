// main
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { removeUser } from "../../store/user.slice";
import { useState, useRef } from "react";

// assets
import {
  exit as exitSvg,
  user as userSVG,
  chevronDoubleUp as upSVG,
} from "../../assets/svgs";

// css
import styles from "./AdminLayout.module.css";

function AdminLayout({ children, title, path, text }) {
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const contentRef = useRef();
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

          <div ref={contentRef} className={styles.content}>
            <div className={styles.contentHeader}>
              <div className="d-flex align-items-center">
                <button
                  className={styles.toggleBtn + " me-4 "}
                  onClick={() => setHide((prev) => !prev)}
                >
                  {hide ? "hiện menu >>" : "<< ẩn menu"}
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

      <button
        className={styles.goToTopBtn}
        onClick={() => {
          if (contentRef.current) {
            contentRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        {upSVG}
      </button>
    </>
  );
}

export default AdminLayout;
