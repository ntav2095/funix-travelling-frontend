import React, { useEffect } from "react";
import styles from "./tour.module.css";
import { brokenImage } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./tour.css";

function Tour(props) {
  const { title, tour, naviga, isLoading } = props;
  const navigation = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
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
              <div
                key={id}
                className={styles.carouselItem}
                onClick={() => navigation("/danh-sach-tour/" + item._id)}
              >
                <div className={styles.img}>
                  <img
                    src={item.thumb}
                    alt={tour.name}
                    onError={handlerBrokenImg}
                  />
                </div>
                <div className={styles.content}>
                  <h5>{item.name}</h5>
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