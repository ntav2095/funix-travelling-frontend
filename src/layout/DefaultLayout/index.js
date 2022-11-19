import { Outlet } from "react-router-dom";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import Banner from "../../components/Banner";
import styles from "./Layout.module.css";

function DefaultLayout({ banner }) {
  return (
    <>
      <Navbar />

      <div className={styles.body}>
        <div className={styles.main}>
          {banner && <Banner />}
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
