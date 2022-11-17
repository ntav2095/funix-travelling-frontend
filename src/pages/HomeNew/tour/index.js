import React, { useEffect } from "react";
import styles from "./tour.module.css";
import { brokenImage } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import Slider from "react-slick";

function Tour(props) {
  const { title, tour, naviga, isLoading } = props;
  const navigation = useNavigate();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  return (
    <div className={styles.title}>
      <div>
        <h3>{title}</h3>
      </div>
      <div className={styles.container}>
        <Slider {...settings}>
          {!isLoading &&
            tour &&
            tour.map((item, id) => (
              <div key={id} className={styles.carouselItemq}>
                <div className={styles.img}>
                  <img
                    src={item.thumb}
                    alt={tour.name}
                    onError={handlerBrokenImg}
                  />
                </div>
                <div className={styles.content}>
                  <h6>item.name</h6>
                  <ul>
                    <li>{item.journey}</li>
                    <li>{item.days + " ngày " + item.nights + " đêm"}</li>
                    <li>{"Trọn gói:" + item.currentPrice + "đ"}</li>
                  </ul>
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <div className={styles.tourdetail} onClick={() => navigation(naviga)}>
        Xem tất cả
      </div>
    </div>
  );
}
export default Tour;
