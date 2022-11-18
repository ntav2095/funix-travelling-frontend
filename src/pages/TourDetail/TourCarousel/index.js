import React, { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import { brokenImage } from "../../../assets/images";
import { xMark as closeSVG } from "../../../assets/svgs";
import Slider from "react-slick";

import styles from "./TourCarousel.module.css";
import "./override.css";
import { useEffect } from "react";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 1,
  speed: 500,
};

function TourCarousel({ tour, isLoading }) {
  const [index, setIndex] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const sliderRef = useRef();

  const handleSelect = (selectedIndex) => {
    if (selectedIndex === -1) {
      setIndex(tour?.slider.length - 1);
    } else if (selectedIndex === tour?.slider.length) {
      setIndex(0);
    } else {
      setIndex(selectedIndex);
    }
  };

  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {tour && (
        <div className="tourCarousel__container">
          <Slider
            {...settings}
            afterChange={(x) => {
              setIndex(x);
            }}
          >
            {!isLoading &&
              tour &&
              tour.slider.map((img, id) => (
                <div
                  key={id}
                  className={styles.image}
                  onClick={() => setIsShowModal(true)}
                >
                  <img src={img} alt={tour.name} onError={handlerBrokenImg} />
                </div>
              ))}
          </Slider>
        </div>
      )}

      <Modal
        show={isShowModal}
        onHide={closeModalHandler}
        animation={false}
        className={styles.modal}
        contentClassName={styles.modalContent}
        centered
        dialogClassName="modal-90w"
        backdropClassName={styles.modalBackdrop}
        size="xl"
      >
        <div className={styles.modalInner}>
          <button className={styles.closeModalBtn} onClick={closeModalHandler}>
            {closeSVG}
          </button>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {!isLoading &&
              tour &&
              tour.slider.map((img, id) => (
                <Carousel.Item key={id} className={styles.carouselItemModal}>
                  <div className={styles.imageModal}>
                    <img src={img} alt={tour.name} onError={handlerBrokenImg} />
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </Modal>
    </>
  );
}

export default TourCarousel;
