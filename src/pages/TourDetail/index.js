import { useParams } from "react-router-dom";
import { useEffect } from "react";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import Layout from "../../layout/Default";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// assets
import { hearder as bannerImg } from "../../assets/images";

// hooks
import usePageTitle from "../../hooks/usePageTitle";

//  css
import styles from "./TourDetail.module.css";
import FacebookComment from "../../containers/facebookComment";
import { useTranslation } from "react-i18next";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();
  const { i18n } = useTranslation();

  const tour = data ? data.data.item : null;

  const tourName = tour ? tour.name : "Tour du lịch";
  usePageTitle(`${tourName} || Go Travel`);
  console.log("xxx", i18n.language);

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, [i18n.language]);

  const breadcrumb = [
    { href: "/", active: false, text: "trang chủ" },
    { href: "/danh-sach-tour", active: false, text: "danh sách tour" },
    {
      href: `/danh-sach-tour/${tourId}`,
      active: true,
      text: tour?.name || "Chi tiết tour",
    },
  ];

  return (
    <Layout breadcrumb={breadcrumb}>
      {tour && (
        <div className="myContainer">
          <img src={bannerImg} className="img-fluid w-100" alt="" />
        </div>
      )}

      {!error && (
        <div className="myContainer">
          {tour && <h1 className="text-uppercase my-4 ">{tour?.name}</h1>}

          <div className={styles.top}>
            <div className={styles.carousel}>
              <TourCarousel tour={tour} isLoading={isLoading} />
            </div>

            <div className={styles.contactTable}>
              <ContactTable tour={tour} isLoading={isLoading} />
            </div>
          </div>

          <div className="myContainer">
            <TourInfo tour={tour} isLoading={isLoading} />
          </div>

          {tour && (
            <FacebookComment
              width="100%"
              href={`https://travelling-website-funix-v1.web.app/danh-sach-tour/${tourId}`}
            />
          )}
        </div>
      )}

      {error && error.httpCode === 404 && <ErrorPage />}
      {error && error.httpCode !== 404 && (
        <ErrorPage code={error.httpCode} message={error.message} />
      )}
    </Layout>
  );
}

export default TourDetail;
