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
import { deltailtour } from "./TourInfo/deltailtour";
//  css
import styles from "./TourDetail.module.css";
import FacebookComment from "../../containers/facebookComment";
import { useTranslation } from "react-i18next";
import Placeholder from "../../components/placeholders/Placeholder";

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
  }, [i18n.language, tourId]);

  return (
    <>
      <div className={styles.tourDetail}>
        {!error && (
          <div>
            <h1 className="text-uppercase my-4 fs-4 fw-bold ">
              {tour && !isLoading && tour?.name}
              {isLoading && <Placeholder height={30} width={"60%"} />}
            </h1>

            <div className="row">
              <div className="col-12 col-lg-8 mb-4">
                <TourCarousel tour={tour} isLoading={isLoading} />
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ContactTable tour={tour} isLoading={isLoading} />
              </div>
            </div>

            <TourInfo
              tour={tour}
              isLoading={isLoading}
              deltailtour={deltailtour}
            />

            <div className="pb-5">
              {tour && (
                <FacebookComment
                  width="100%"
                  href={`https://travelling-website-funix-v1.web.app/danh-sach-tour/${tourId}`}
                />
              )}
            </div>
          </div>
        )}
        {error && <ErrorPage code={error.httpCode} message={error.message} />}
      </div>
    </>
  );
}

export default TourDetail;
