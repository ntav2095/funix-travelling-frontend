import { useParams } from "react-router-dom";
import { useEffect } from "react";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import Layout from "../../layout/Default";
import TourCarousel from "./TourCarousel";

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

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();

  const tour = data ? data.data.item : null;

  const tourName = tour ? tour.name : "Tour du lịch";
  usePageTitle(`${tourName} || Go Travel`);

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, []);

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
      <div className="myContainer">
        <img src={bannerImg} className="img-fluid w-100" alt="" />
      </div>

      <div className="myContainer">
        <h1 className="text-uppercase my-4 ">{tour?.name}</h1>
        <div className={styles.top}>
          <div className={styles.carousel}>
            <TourCarousel tour={tour} isLoading={isLoading} />
          </div>

          <div className={styles.contactTable}>
            <ContactTable tour={tour} isLoading={isLoading} />
          </div>
        </div>

        <TourInfo tour={tour} isLoading={isLoading} />

        {tour && (
          <FacebookComment
            width="100%"
            href={`https://travelling-website-funix-v1.web.app/danh-sach-tour/${tourId}`}
          />
        )}
      </div>
    </Layout>
  );
}

export default TourDetail;
