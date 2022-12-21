import React, { useEffect } from "react";
import styles from "./tour.module.css";
import { Link } from "react-router-dom";
import { brokenImage } from "../../../assets/images";
import Slider from "react-slick";
import "./tour.css";
import { useTranslation } from "react-i18next";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import { Col } from "react-bootstrap";
import { placeholder } from "../../../assets/images";
import {
  SlickArrowLeft,
  SlickArrowRight,
} from "../../../components/slickArrows";

const trans = {
  days: {
    en: "days",
    vi: "ngày",
  },
  nights: {
    en: "nights",
    vi: "đêm",
  },
  full_package: {
    en: "Full package: ",
    vi: "Trọn gói: ",
  },
};

function Tour(props) {
  const { title, tour, naviga, isLoading } = props;
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    useTransform: false,
    initialSlide: 0,
    nextArrow: <SlickArrowRight slidesToShow={4} slidesToScroll={2} />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          nextArrow: <SlickArrowRight slidesToShow={3} slidesToScroll={3} />,
          useTransform: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <SlickArrowRight slidesToShow={2} slidesToScroll={1} />,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} />,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  return (
    <div className="home__tours">
      <div className={styles.title}>
        <p className="fs-5 ">{title}</p>
      </div>
      <div className={styles.container}>
        <Slider {...settings}>
          {!isLoading &&
            tour &&
            tour.map((item, id) => (
              <div key={id} className={styles.carouselItem}>
                <Link to={`/danh-sach-tour/${item.code}`}>
                  <div className={styles.img}>
                    <img
                      src={placeholder}
                      alt={tour.name}
                      lazy={item.thumb}
                      onError={handlerBrokenImg}
                    />
                  </div>
                  <div className={styles.content}>
                    <h5 className="text-uppercase">{item.name}</h5>
                    <p>{item.countries || item.journey}</p>
                    <p>
                      {item.duration.days} {trans.days[lang]}{" "}
                      {item.duration.nights} {trans.nights[lang]}
                    </p>
                    <p>
                      {trans.full_package[lang]}{" "}
                      <strong>{item.price.toLocaleString()} đ</strong>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          {!tour &&
            new Array(6).fill(1).map((item, index) => (
              <Col key={index} className="mb-4">
                <CardPlaceholder />
              </Col>
            ))}
        </Slider>
      </div>
      <Link className={styles.tourdetail} to={naviga}>
        {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
      </Link>
    </div>
  );
}
export default Tour;
