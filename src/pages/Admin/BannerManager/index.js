import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { layoutApi, tourApi } from "../../../services/apis";
import { useEffect } from "react";
import SpinnerModal from "../../../components/SpinnerModal";
import ImagesManger from "./ImagesManger";
import styles from "./LayoutManager.module.css";
import "./LayoutManager.override.css";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function LayoutManager() {
  const [fetchTours, fetchingTours, toursData, toursError] = useAxios();

  return (
    <>
      <SpinnerModal show={fetchingTours} />
      <AdminLayout>
        <StatusBar title="Quản lý banners" />

        <div className={styles.container + "  layoutManager"}></div>
      </AdminLayout>
    </>
  );
}

export default LayoutManager;
