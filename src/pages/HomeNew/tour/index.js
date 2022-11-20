import React, { useEffect } from "react";
import styles from "./tour.module.css";
import { Link } from "react-router-dom";
import { brokenImage } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./tour.css";
import { useTranslation } from "react-i18next";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import { Col } from "react-bootstrap";

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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
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
    <div className="home__tours">
      <div className={styles.title}>
        <h3 className="fs-5 pb-2">{title}</h3>
      </div>
      <div className={styles.container}>
        <Slider {...settings}>
          {!isLoading &&
            tour &&
            tour.map((item, id) => (
              <div key={id} className={styles.carouselItem}>
                <Link to={`/danh-sach-tour/${item._id}`}>
                  <div className={styles.img}>
                    <img
                      src={item.thumb}
                      alt={tour.name}
                      onError={handlerBrokenImg}
                    />
                  </div>
                  <div className={styles.content}>
                    <h5 className="text-uppercase">{item.name}</h5>
                    <p>{item.countries || item.journey}</p>
                    <p>
                      {item.days} {trans.days[lang]} {item.nights}{" "}
                      {trans.nights[lang]}
                    </p>
                    <p>
                      {trans.full_package[lang]}{" "}
                      <strong>{item.currentPrice.toLocaleString()} đ</strong>
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
