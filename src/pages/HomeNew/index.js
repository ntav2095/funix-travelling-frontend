import React, { useEffect } from "react";
import HomeHeader from "./HomeHeader";
import "./home.css";
import useAxios from "../../hooks/useAxios";
import { postsApi, tourApi } from "../../services/apis";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import ErrorPage from "../../containers/ErrorPage";
import SliderCard from "../../containers/SliderCard";

function HomeNew() {
  const { i18n } = useTranslation();
  const [lazy] = useLazyLoading(loadingImg);

  const [
    sendRequestTourTrongNuoc,
    isLoadingTourTrongNuoc,
    dataTourTrongNuoc,
    errorTourTrongNuoc,
  ] = useAxios();

  const [
    sendRequestTourChauAu,
    isLoadingTourChauAu,
    dataTourChauAu,
    errorTourChauAu,
  ] = useAxios();

  const [sendRequestGuides, isLoadingGuides, dataGuides, errorGuides] =
    useAxios();

  useEffect(() => {
    sendRequestTourTrongNuoc(tourApi.get({ page: 1, page_size: 6 }));
    sendRequestGuides(postsApi.get({ page: 1, page_size: 6 }));
  }, [i18n.language]);

  // useEffect(() => {
  //   const randomnumber = Math.random() * 2;
  //   if (dataTourTrongNuoc) {
  //     const arrdata = [];

  //     dataTourTrongNuoc.data.map((item, id) => {
  //       if (randomnumber < 1) {
  //         if (id % 2 == 0) {
  //           arrdata.push({ id: item._id, image: item.thumb });
  //         }
  //       } else {
  //         if (id % 2 == 1) {
  //           arrdata.push({ id: item._id, image: item.thumb });
  //         }
  //       }
  //     });
  //     dispatch(homesliderTrongNuoc(arrdata));
  //   }
  //   if (dataTourChauAu) {
  //     const arrdata = [];
  //     dataTourChauAu.data.map((item, id) => {
  //       if (randomnumber < 1) {
  //         if (id % 2 == 0) {
  //           arrdata.push({ id: item._id, image: item.thumb });
  //         }
  //       } else {
  //         if (id % 2 == 1) {
  //           arrdata.push({ id: item._id, image: item.thumb });
  //         }
  //       }
  //     });

  //     dispatch(homesliderChauAu(arrdata));
  //   }
  // });

  useEffect(() => {
    lazy();
  }, [isLoadingGuides, isLoadingTourTrongNuoc, isLoadingTourChauAu]);
  return (
    <>
      <div className="containerHomeabout">
        <HomeHeader />
      </div>

      <div className="containerHomeabout">
        <SliderCard
          title={i18next.t("homeMain.titleTourChauAu")}
          data={dataTourTrongNuoc?.data}
          loadingCard={true}
          naviga={"/tours-trong-nuoc"}
          page={"home"}
        />
      </div>

      <div className="containerHomeabout">
        <SliderCard
          title={i18next.t("homeMain.titleTourTrongNuoc")}
          data={dataTourTrongNuoc?.data}
          loadingCard={true}
          naviga={"/tours-trong-nuoc"}
          page={"home"}
        />
      </div>

      <div className="containerHomeabout">
        <SliderCard
          title={i18next.t("homeMain.titleCamNang")}
          data={dataGuides?.data}
          loadingCard={true}
          naviga={"/cam-nang-du-lich"}
          page={"article"}
        />
      </div>
      {errorTourTrongNuoc && (
        <ErrorPage
          code={errorTourTrongNuoc.httpCode}
          message={errorTourTrongNuoc.message}
        />
      )}
    </>
  );
}
export default HomeNew;
