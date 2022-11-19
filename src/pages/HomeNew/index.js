import React, { useEffect } from "react";
import HomeHearder from "./HomeHearder";
import "./home.css";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import Tour from "./tour";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Banner from "../../components/Banner";
import DefaultLayout from "../../layout/DefaultLayout";

function HomeNew() {
  const { i18n } = useTranslation();
  const [sendRequest, isLoading, data, error] = useAxios();
  useEffect(() => {
    sendRequest(tourApi.get({ page: 1, page_size: 6 }));
  }, [i18n.language]);
  return (
    <DefaultLayout banner>
      <div className="mb-5">
        <HomeHearder />
      </div>

      <div className="mb-5">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourChauAu")}
          naviga={"/tour-chau-au"}
          isloading={isLoading}
        />
      </div>

      <div className="mb-5">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourTrongNuoc")}
          naviga={"/tour-trong-nuoc"}
          isloading={isLoading}
        />
      </div>

      <div className="mb-5">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleCamNang")}
          naviga={"/cam-nang-du-lich"}
          isloading={isLoading}
        />
      </div>
    </DefaultLayout>
  );
}
export default HomeNew;
