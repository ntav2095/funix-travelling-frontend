// main
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  Container,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

// assets
import { brokenImage } from "../../assets/images";

// css
import styles from "./TourCard.module.css";

function TourCard({ tour }) {
  const errorImgHandler = (e) => {
    e.target.src = brokenImage;
  };
  return (
    <Card className={styles.card}>
      <Link
        className={styles.image}
        to={`/danh-sach-tour/${tour._id}`}
        style={{ backgroundImage: `url(${tour.images[0]})` }}
      ></Link>

      <CardBody className={styles.textBox}>
        <Link to={`/danh-sach-tour/${tour._id}`}>
          <CardTitle tag="h5" className={styles.name} title={tour.name}>
            {tour.name}
          </CardTitle>
        </Link>
        <CardSubtitle tag="h6" className={styles.duration}>
          {tour.time.duration}
        </CardSubtitle>
        <CardSubtitle tag="h6" className={styles.journey} title={tour.journey}>
          {tour.journey}
        </CardSubtitle>

        <div className={styles.cardFooter}>
          <p className={styles.price}>
            {tour.price.from.toLocaleString()} ĐỒNG
          </p>
          <Link className={styles.seeDetail} to={`/danh-sach-tour/${tour._id}`}>
            XEM CHI TIẾT
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export default TourCard;
