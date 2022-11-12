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

// hooks
import usePageTitle from "../../hooks/usePageTitle";

//  css
import styles from "./TourDetail.module.css";
import FacebookComment from "../../containers/facebookComment";
import ReviewTour from "./TourInfo/ReviewTour";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();
  const tourName = data ? data.item.name : "Tour du lịch";
  usePageTitle(`${tourName} || Go Travel`);

  const tour = data ? data.item : null;

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, []);

  const breadcrumb = [
    { href: "/", active: false, text: "trang chủ" },
    { href: "/danh-sach-tour", active: false, text: "danh sách tour" },
    {
      href: `/danh-sach-tour/${tourId}`,
      active: true,
      text: data?.item?.name || "Chi tiết tour",
    },
  ];

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="myContainer">
        <div className={styles.top}>
          <div className={styles.carousel}>
            <TourCarousel tour={tour} isLoading={isLoading} />
          </div>

          <div className={styles.contactTable}>
            <ContactTable tour={tour} isLoading={isLoading} />
          </div>
        </div>

        <TourInfo tour={tour} isLoading={isLoading} />

        {tour && <ReviewTour tour={tour} />}

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
