import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { layoutApi } from "../../../services/apis";
import { useEffect } from "react";
import SpinnerModal from "../../../components/SpinnerModal";
import ImagesManger from "./ImagesManger";
import styles from "./LayoutManager.module.css";

const LAYOUT_IMAGES = [
  {
    type: "home",
    name: "Slider trang chủ",
  },
  {
    type: "vn_tours",
    name: "Banner tours Việt Nam",
  },
  {
    type: "eu_tours",
    name: "Banner tours Châu Âu",
  },
  {
    type: "tour",
    name: "Banner chi tiết tour",
  },
  {
    type: "guides",
    name: "Banner Cẩm nang du lịch",
  },
  {
    type: "article",
    name: "Banner bài viết cẩm nang du lịch",
  },
];

function LayoutManager() {
  const [sendRequest, isLoading, data, error] = useAxios((data) => data.data);

  useEffect(() => {
    sendRequest(layoutApi.get());
  }, []);

  console.log(data);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout>
        {data &&
          LAYOUT_IMAGES.map((item) => (
            <div key={item.type} className="py-3 border-bottom border-success">
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
          ))}
      </AdminLayout>
    </>
  );
}

export default LayoutManager;
