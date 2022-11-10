// main
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// components
import TourCard from "../../../containers/TourCard";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// css
import styles from "./TrendingTours.module.css";

function TrendingTours() {
  const [sendRequest, isLoading, data, error] = useAxios();

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <div className={styles.container}>
        <h2 className={styles.title}>Tours nổi bật</h2>
        {data && data.items.length > 0 && (
          <Row lg="3" md="2" sm="1">
            {data.items.map((tour) => (
              <Col key={tour._id} className="mb-4">
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default TrendingTours;
