import Sidebar from "../../containers/Sidebar";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import styles from "./Layout.module.css";

function DefaultLayout({ children, sidebarLeft, sidebarRight, primary }) {
  if (sidebarLeft || sidebarRight) {
    let classes = styles.container;
    if (sidebarLeft) {
      classes += " " + styles.sidebarLeft;
    }

    if (sidebarRight) {
      classes += " " + styles.sidebarRight;
    }

    return (
      <>
        <Navbar />
        <div className={classes}>
          <div className={styles.sidebar}>
            <Sidebar primary={primary} />
          </div>
          <div className={styles.content}>
            <div className={styles.article}>{children}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
