import React, { useEffect } from "react";
import Layout from "../../layout/Default";
import HomeHearder from "./HomeHearder";
import "./home.css";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import Tour from "./tour";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function HomeNew() {
  const {i18n}=useTranslation()

  const [sendRequest, isLoading, data, error] = useAxios();
  useEffect(() => {
    sendRequest(tourApi.get({ page: 1, page_size: 6 }));
  }, [i18n.language]);
  return (
    <Layout>
      <div className="myContainer">
        <HomeHearder />
      </div>

      <div className="myContainer">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourChauAu")}
          naviga={"/tour-chau-au"}
          isloading={isLoading}
        />
      </div>

      <div className="myContainer">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourTrongNuoc")}
          naviga={"/tour-trong-nuoc"}
          isloading={isLoading}
        />
      </div>

      <div className="myContainer">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleCamNang")}
          naviga={"/cam-nang-du-lich"}
          isloading={isLoading}
        />
      </div>
    </Layout>
  );
}
export default HomeNew;
