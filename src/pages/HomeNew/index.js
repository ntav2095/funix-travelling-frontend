import React, { useEffect } from "react";
import HomeHeader from "./HomeHeader";
import "./home.css";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import Tour from "./tour";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import DefaultLayout from "../../layout/DefaultLayout";
import Banner from "../../components/Banner";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";

function HomeNew() {
  const { i18n } = useTranslation();
  const [lazy] = useLazyLoading(loadingImg);

  const [sendRequest, isLoading, data, error] = useAxios();
  useEffect(() => {
    sendRequest(tourApi.get({ page: 1, page_size: 6 }));
  }, [i18n.language]);


  useEffect(() => {
    lazy();
},[isLoading]);
  return (
    <>
      <div className="containerHomeabout">
        <HomeHeader />
      </div>

      <div className="containerHome">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourChauAu")}
          naviga={"/tours-chau-au"}
          isloading={isLoading}
        />
      </div>

      <div className="containerHome">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleTourTrongNuoc")}
          naviga={"/tours-trong-nuoc"}
          isloading={isLoading}
        />
      </div>

      <div className="containerHome">
        <Tour
          tour={data?.data}
          title={i18next.t("homeMain.titleCamNang")}
          naviga={"/cam-nang-du-lich"}
          isloading={isLoading}
        />
      </div>
    </>
  );
}
export default HomeNew;
