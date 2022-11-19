import { useParams } from "react-router-dom";
import { useEffect } from "react";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// assets

// hooks
import usePageTitle from "../../hooks/usePageTitle";

//  css
import styles from "./TourDetail.module.css";
import FacebookComment from "../../containers/facebookComment";
import { useTranslation } from "react-i18next";
import Banner from "../../components/Banner";
import DefaultLayout from "../../layout/DefaultLayout";

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

  return (
    <DefaultLayout banner>
      <div className={styles.tourDetail}>
        {!error && (
          <div>
            {tour && (
              <h1 className="text-uppercase my-4 fs-4 fw-bold ">
                {tour?.name}
              </h1>
            )}

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
        )}

        {error && error.httpCode === 404 && <ErrorPage />}
        {error && error.httpCode !== 404 && (
          <ErrorPage code={error.httpCode} message={error.message} />
        )}
      </div>
    </DefaultLayout>
  );
}

export default TourDetail;
