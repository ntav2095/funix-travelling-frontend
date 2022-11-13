import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { brokenImage, placeholder } from "../../../assets/images";
//  css
import styles from "./HomeSlider.module.css";


function Sliderheader({ tours, isLoading }) {
  return (
    <Carousel id="container" className={styles.carousel}>
      {tours &&
        !isLoading &&
        tours.map((tour) => (
          <Carousel.Item key={tour._id} className={styles.carouselItem}>
            <div className={styles.image}>
              <Link to={`/danh-sach-tour/${tour._id}`}>
              <img
                src={tour.images[0]}
                alt="Second slide"
                onError={(e) => (e.target.src = brokenImage)}
              />
            </Link>
            </div>
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
