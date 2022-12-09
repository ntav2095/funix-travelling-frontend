import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { layoutApi } from "../../../services/apis";
import { useEffect } from "react";
import SpinnerModal from "../../../components/SpinnerModal";
import ImagesManger from "./ImagesManger";
import styles from "./LayoutManager.module.css";
import "./LayoutManager.override.css";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const LAYOUT_IMAGES = [
  {
    type: "home",
    name: "Trang chủ",
  },
  {
    type: "vn_tours",
    name: "Tours Việt Nam",
  },
  {
    type: "eu_tours",
    name: "Tours Châu Âu",
  },
  {
    type: "tour",
    name: "Chi tiết tour",
  },
  {
    type: "guides",
    name: "Cẩm nang du lịch",
  },
  {
    type: "article",
    name: "Bài viết cẩm nang du lịch",
  },
];

function LayoutManager() {
  const [sendRequest, isLoading, data, error] = useAxios((data) => data.data);

  useEffect(() => {
    sendRequest(layoutApi.get());
  }, []);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout>
        <StatusBar title="Quản lý banners" />

        <div className={styles.container + "  layoutManager"}>
          {data && (
            <Tabs defaultActiveKey={LAYOUT_IMAGES[0].type}>
              {LAYOUT_IMAGES.map((item) => (
                <Tab key={item.type} eventKey={item.type} title={item.name}>
                  <div key={item.type} className="py-3 ">
                    <ImagesManger
                      type={item.type}
                      name={item.name}
                      initialImages={
                        Array.isArray(data.images[item.type])
                          ? data.images[item.type]
                          : [data.images[item.type]]
                      }
                    />
                  </div>
                </Tab>
              ))}
            </Tabs>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default LayoutManager;
