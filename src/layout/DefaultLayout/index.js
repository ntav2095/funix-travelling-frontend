import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner";
import styles from "./Layout.module.css";
import Sidebar from "../../containers/Sidebar";
import Navbar from "../../containers/Navbar";
import Footer from "../../containers/Footer";

function DefaultLayout() {
  
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.body + " container-lg"}>
          <Banner />
          <Outlet  />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
