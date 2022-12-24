// main
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeUser } from "../../store/user.slice";
import { useState, useRef } from "react";
import { toggleSidebar } from "../../store/layout.slice";

// assets
import {
  exit as exitSvg,
  user as userSVG,
  chevronDoubleUp as upSVG,
  boxArrowRight,
  bus,
  passport,
  layout,
  category,
  book,
} from "../../assets/svgs";

// css
import styles from "./AdminLayout.module.css";

function AdminLayout({ children }) {
  // const [hide, setHide] = useState(false);

  const sidebarIsShow = useSelector((state) => state.layout.sidebar.isShow);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const contentRef = useRef();

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? styles.active : undefined;

  let sidebarClasses = styles.sidebar;

  if (!sidebarIsShow) {
    sidebarClasses += " " + styles.hide;
  }
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={sidebarClasses}>
            <button className={styles.toggleBtn} onClick={toggleSidebarHandler}>
              {boxArrowRight}
            </button>

            {user && (
              <div className={styles.userInfo}>
                {userSVG}
                <p>{user.username}</p>
              </div>
            )}
            <ul className={styles.nav}>
              <li>
                <NavLink className={navLinkClasses} to="/admin/tours">
                  {!sidebarIsShow ? bus : "Tour"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/admin/visa-products">
                  {!sidebarIsShow ? passport : "Visa"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/admin/articles">
                  {!sidebarIsShow ? book : "Guides"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/admin/terms">
                  {!sidebarIsShow ? book : "Điều khoản"}
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClasses} to="/admin/users">
                  User
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClasses} to="/admin/about">
                  About
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClasses} to="/admin/category">
                  {!sidebarIsShow ? category : "Danh mục"}
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

            <div className={styles.logout} onClick={logoutHandler}>
              {exitSvg}
              {sidebarIsShow && <button>Log out</button>}
            </div>
          </div>

          <div ref={contentRef} className={styles.content} id="admin__content">
            {children}
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
