// main
import { Row, Col } from "react-bootstrap";

// components
import TourCard from "../../../containers/TourCard";

// css
import styles from "./TrendingTours.module.css";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";

function TrendingTours({ tours, isLoading }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tours nổi bật</h2>

      <Row lg="3" md="2" sm="1">
        {!isLoading &&
          tours &&
          tours.length > 0 &&
          tours.map((tour) => (
            <Col key={tour._id} className="mb-4">
              <TourCard tour={tour} />
            </Col>
          ))}

        {isLoading &&
          new Array(6).fill(1).map((item, index) => (
            <Col key={index} className="mb-4">
              <CardPlaceholder />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default TrendingTours;
