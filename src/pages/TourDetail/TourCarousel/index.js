import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import { brokenImage } from "../../../assets/images";
import { xMark as closeSVG } from "../../../assets/svgs";

import styles from "./TourCarousel.module.css";

function TourCarousel({ tour, isLoading }) {
  const [index, setIndex] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {!isLoading &&
          tour &&
          tour.slider.map((img, id) => (
            <Carousel.Item
              key={id}
              className={styles.carouselItem}
              onClick={() => setIsShowModal(true)}
            >
              <img src={img} alt={tour.name} onError={handlerBrokenImg} />
            </Carousel.Item>
          ))}

        {isLoading && (
          <div className={styles.carouselItem + " " + styles.placeholder}></div>
        )}
      </Carousel>

      <div className={styles.imageMenu}>
        {!isLoading &&
          tour &&
          tour.slider.map((img, id) => (
            <div key={id} className={styles.image} onClick={() => setIndex(id)}>
              <img src={img} alt={tour.name} onError={handlerBrokenImg} />
              {index !== id && <div className={styles.overlay} />}
            </div>
          ))}

        {isLoading &&
          new Array(4)
            .fill(1)
            .map((item, id) => (
              <div
                key={id}
                className={styles.image + " " + styles.placeholder}
              />
            ))}
      </div>

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
