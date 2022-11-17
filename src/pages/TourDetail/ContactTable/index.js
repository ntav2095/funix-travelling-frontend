import React from "react";
import BookingModal from "../BookingModal";
import { format } from "date-fns";
import { home3 as phonePng } from "../../../assets/images";
import { arrowRight as arrowSvg } from "../../../assets/svgs";
import styles from "./ContactTable.module.css";

function ContactTable({ tour, isLoading }) {
  const [modalShow, setModalShow] = React.useState(false);

  const pointOfDeparture = tour ? tour.journey.split("-")[0].trim() : "";
  const destinations = tour
    ? tour.journey
        .split("-")
        .map((item) => item.trim())
        .filter((item) => item.toLowerCase() !== pointOfDeparture.toLowerCase())
        .join(" - ")
    : "";
  return (
    <>
      <BookingModal show={modalShow} onHide={() => setModalShow(false)} />

      {!isLoading && tour && (
        <div
          className={
            styles.container +
            " d-flex d-lg-block align-items-start flex-column flex-sm-row "
          }
        >
          <div className={styles.card + " mx-auto"}>
            <ul className={styles.tourInfo}>
              <li>
                <span>Trọn gói: </span>
                <strong className={styles.price}>
                  {tour.currentPrice.toLocaleString()} đ
                </strong>
              </li>
              <li>
                <span>Điểm đến: </span>
                <strong>{destinations}</strong>
              </li>
              <li>
                <span>Thời gian: </span>
                <strong>
                  {tour.days} ngày {tour.nights} đêm
                </strong>
              </li>
              <li>
                <span>Điểm khởi hành: </span>
                <strong>{pointOfDeparture}</strong>
              </li>
            </ul>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow(true)}
            >
              Ngày khởi hành
              {arrowSvg}
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow(true)}
            >
              Đặt tour
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow(true)}
            >
              Liên hệ tư vấn
            </button>
          </div>

          <div
            className={
              styles.contactInfo + " row  mt-4 mt-sm-0 mt-lg-4 mx-auto"
            }
          >
            <div className="col-8 ">
              <h4 className="mb-2">Thông tin liên hệ:</h4>
              <ul>
                <li>Hotline: 123456789</li>
                <li>Zalo: 123456789</li>
                <li>Email: abcxyz@gmail.com</li>
              </ul>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center ">
              <img src={phonePng} alt="phone" />
            </div>
          </div>
        </div>
      )}

      {isLoading && <div className={styles.placeHolder}></div>}
    </>
  );
}

export default ContactTable;
