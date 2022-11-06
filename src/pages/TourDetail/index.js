import Goituvan from "./Giotuvan";
import Mota from "./Mota";
import Layout from "../../layout/Default";
import SlideImage from "./slideimage";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import { Row } from "react-bootstrap";

import axios from "axios";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import useEditor from "../../hooks/useEditor";
import { useEffect } from "react";

const imageArr = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
];

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
      <div className="tour-detail">
        {tour && (
          <Row>
            <div style={{ width: "70%" }}>
              <SlideImage input={tour.images} ratio={`3:2`} mode={`manual`} />
            </div>
            <div style={{ width: "30%" }}>
              <Goituvan tour={tour} />
            </div>
          </Row>
        )}
        {tour && <Mota tour={tour} />}
      </div>
    </Layout>
  );
}

export default TourDetail;
