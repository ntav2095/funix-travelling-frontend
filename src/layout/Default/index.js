import Sidebar from "../../containers/Sidebar";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./Layout.module.css";

import i18next from "../../services/languages/i18n";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DefaultLayout({
  children,
  sidebarLeft,
  sidebarRight,
  primary,
  breadcrumb,
}) {
  const { i18n, t } = useTranslation();

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

      <div className="myContainer">
        <div className={styles.languageBar}>
          <button
            className={
              styles.vi +
              " " +
              (i18n.language === "vi" ? styles.active : undefined)
            }
            onClick={() =>
              i18n
                .changeLanguage("vi")
                .then()
                .catch((err) => console.error(err))
            }
          >
            Việt Nam
          </button>
          <button
            className={
              styles.en +
              " " +
              (i18n.language === "en" ? styles.active : undefined)
            }
            onClick={() =>
              i18n
                .changeLanguage("en")
                .then(() => console.log(2))
                .catch((err) => console.error(err))
            }
          >
            English
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
