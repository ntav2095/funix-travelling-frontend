import Sidebar from "../../containers/Sidebar";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

function DefaultLayout({
  children,
  sidebarLeft,
  sidebarRight,
  primary,
  breadcrumb,
}) {
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
        {breadcrumb && (
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              {breadcrumb.map((item, index) => (
                <Breadcrumb.Item
                  key={index}
                  active={item.active}
                  linkAs={Link}
                  linkProps={{ to: item.href }}
                >
                  {item.text}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
        )}

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
      {breadcrumb && (
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            {breadcrumb.map((item, index) => (
              <Breadcrumb.Item
                key={index}
                active={item.active}
                linkAs={Link}
                linkProps={{ to: item.href }}
              >
                {item.text}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      )}
      {children}

      <Footer />
    </>
  );
}

export default DefaultLayout;
