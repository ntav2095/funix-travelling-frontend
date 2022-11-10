import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

// vũ css
import styles from "./HomeSlider.module.css";

function Sliderheader() {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item className={styles.carouselItem}>
        <img
          src="/asscets/img/slider-templates-kyco-1-1400x788.jpg"
          alt="Second slide"
        />
        <div className="caption">
          <Carousel.Caption interval={1000}>
            <h3>GỀNH ĐÁ PHÚ YÊN</h3>
            <p>DẤU CHÂN THIÊN ĐƯỜNG - ĐỊA ĐIỂM KHÁM PHÁ THÚ VỊ</p>
            <Button variant="primary">Xem thêm</Button>{" "}
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item className={styles.carouselItem}>
        <img
          src="/asscets/img/slider-templates-ghenh-da-2-1400x788.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>GỀNH ĐÁ PHÚ YÊN</h3>
          <p>DẤU CHÂN THIÊN ĐƯỜNG - ĐỊA ĐIỂM KHÁM PHÁ THÚ VỊ</p>
          <Button variant="primary">Xem thêm</Button>{" "}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Sliderheader;
