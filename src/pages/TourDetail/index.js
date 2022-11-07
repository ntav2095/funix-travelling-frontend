import Goituvan from "./Giotuvan";
import Mota from "./Mota";
import Layout from "../../layout/Default";
import SlideImage from "./slideimage";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import { Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import { useEffect } from "react";

// vũ css
import styles from "./TourDetail.module.css";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();

  const tour = data ? data.item : null;

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, []);

  if (data) {
    console.log(tour.images);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className="tour-detail------tam_thoi_bo">
          {tour && (
            <div className={styles.top}>
              <div className={styles.carousel}>
                <SlideImage input={tour.images} ratio={`3:2`} mode={`manual`} />
              </div>
              <div className={styles.contactTable}>
                <Goituvan tour={tour} />
              </div>
            </div>
          )}
          {tour && <Mota tour={tour} />}
        </div>
      </div>
    </Layout>
  );
}

export default TourDetail;
