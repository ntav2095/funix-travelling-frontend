import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { brokenImage, placeholder } from "../../../assets/images";
//  css
import styles from "./HomeSlider.module.css";
import "./overrideCarousel.css";

function Sliderheader({ tours, isLoading }) {
  return (
    <Carousel className={styles.carousel}>
      {tours &&
        !isLoading &&
        tours.map((tour) => (
          <Carousel.Item key={tour._id} className={styles.carouselItem}>
            <div className={styles.image}>
              <img
                src={tour.images[0]}
                alt="Second slide"
                onError={(e) => (e.target.src = brokenImage)}
              />
            </div>
            <Carousel.Caption interval={1000}>
              <h3>{tour.name}</h3>
              <Button variant="primary" size="lg">
                <Link to={`/danh-sach-tour/${tour._id}`}>Xem thêm</Link>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      {isLoading && (
        <Carousel.Item className={styles.carouselItem}>
          <div className={styles.image}>
            <img src={placeholder} alt="Second slide" />
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default Sliderheader;
