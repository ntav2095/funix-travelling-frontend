import React, { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import { brokenImage } from "../../../assets/images";
import { xMark as closeSVG } from "../../../assets/svgs";
import Slider from "react-slick";

import styles from "./TourCarousellichtrinh.module.css";
import "./overridelichtrinh.css";
import Placeholder from "../../../components/placeholders/Placeholder";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function TourCarousellichtrinh({ tour, isLoading }) {
  const [index, setIndex] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleSelect = (selectedIndex) => {
    if (selectedIndex === -1) {
      setIndex(tour?.slider.length - 1);
    } else if (selectedIndex === tour?.slider.length) {
      setIndex(0);
    } else {
      setIndex(selectedIndex);
    }
  };
  console.log(tour.images.length);
  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {tour && !isLoading && (
        <Slider
          {...settings}
          afterChange={(x) => {
            setIndex(x);
          }}
        >
          {!isLoading &&
            tour.images.length != 0 &&
            tour.images.map((img, id) => (
              <div
                className="tourCarousel__container"
                id="tourCarousel__container1"
              >
                <div
                  key={id}
                  className={styles.image}
                  onClick={() => setIsShowModal(true)}
                >
                  <img
                    style={{ display: "block" }}
                    src={img}
                    alt={tour.name}
                    onError={handlerBrokenImg}
                  />
                </div>
              </div>
            ))}
        </Slider>
      )}

      {isLoading && (
        <Slider
          {...settings}
          afterChange={(x) => {
            setIndex(x);
          }}
        >
          {new Array(3).fill(1).map((item, index) => (
            <div
              className="tourCarousel__container"
              id="tourCarousel__container1"
            >
              <div
                key={index}
                className={styles.image}
                onClick={() => setIsShowModal(true)}
              >
                <Placeholder width="100%" height="100%" />
              </div>
            </div>
          ))}
        </Slider>
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
              tour.images.map((img, id) => (
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

export default TourCarousellichtrinh;
