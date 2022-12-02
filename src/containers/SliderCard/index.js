import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CardPlaceholder from "../../components/placeholders/CardPlaceholder";

import { brokenImage } from "../../assets/images";
import { placeholder } from "../../assets/images";
import { chevronLeft, chevronRight } from "../../assets/svgs";
import { SlickArrowLeft, SlickArrowRight } from "../../components/slickArrows";

import Slider from "react-slick";
import { Col } from "react-bootstrap";

import "./Slider.css";
import styles from "./slider.module.css";

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

function SliderCard(props) {
  // page= home hoặc page=article sẽ hiển thị nút xem tất cả
  //
  const { title, data, naviga, isloading, page, loadingCard } = props;
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <button>{chevronLeft}</button>,
    // prevArrow: <button>{chevronRight}</button>,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 576,
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
    <>
      {loadingCard && (
        <div className="Slider">
          <div className={styles.title}>
            <p className="fs-5 text-uppercase">{title}</p>
          </div>
          <div className={styles.container}>
            <Slider {...settings}>
              {data &&
                data.length > 0 &&
                data.map((item, id) => (
                  <div key={id} className={styles.carouselItem}>
                    <Link
                      to={
                        page == "article"
                          ? `/cam-nang-du-lich/${item._id}`
                          : `/danh-sach-tour/${item._id}`
                      }
                    >
                      <div className={styles.img}>
                        <img
                          src={placeholder}
                          alt={item.name}
                          lazy={item.thumb}
                          onError={handlerBrokenImg}
                        />
                      </div>

                      <div className={styles.content}>
                        {page == "article" ? (
                          <>
                            <h5 className="text-uppercase">{item.title}</h5>
                            <p>{title}</p>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}

              {(!data || data.length == 0) &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
          </div>
          {(page == "home" || page == "article") && (
            <Link className={styles.tourdetail} to={naviga}>
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
export default SliderCard;
