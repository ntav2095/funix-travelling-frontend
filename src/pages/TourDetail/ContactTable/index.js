import React from "react";
import BookingModal from "../BookingModal";
import { format } from "date-fns";

// vũ css
import styles from "./ContactTable.module.css";

function ContactTable({ tour, isLoading }) {
  const [modalShow, setModalShow] = React.useState(false);

  const departureDates = tour
    ? tour.departureDates
        .map((item) => format(new Date(item), "dd/MM/yyyy"))
        .join(", ")
    : "";

  return (
    <>
      <BookingModal show={modalShow} onHide={() => setModalShow(false)} />

      {!isLoading && tour && (
        <div className={styles.contactTable}>
          <div>
            <h3 className={styles.title}>Gọi để tư vấn</h3>
            <div className={styles.generalInfo}>
              <div>
                <p>Ngày khởi hành:</p>
                <p>{departureDates}</p>
              </div>
              <div>
                <p>Thời gian:</p>
                <p>
                  {tour.duration.days} ngày {tour.duration.nights} đêm
                </p>
              </div>
              <div>
                <p>Lịch trình:</p>
                <p>{tour.journey}</p>
              </div>
            </div>

            <p className={styles.price}>{tour.currentPrice} đồng</p>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow(true)}
            >
              Đặt Tour ngay
            </button>

            <p className={styles.contactSoon}>Liên hệ càng sớm - Giá càng rẻ</p>

            <img src="/asscets/img/duanmoi.png" className={styles.phoneImage} />

            <p>
              Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau ít
              phút!
            </p>

            <input
              className={styles.phoneInput}
              type="tel"
              placeholder="Số điên thoại của bạn là"
            />

            <button type="submit" className={styles.callbackBtn}>
              yêu cầu gọi lại
            </button>
          </div>
        </div>
      )}

      {isLoading && <div className={styles.placeHolder}></div>}
    </>
  );
}

export default ContactTable;
