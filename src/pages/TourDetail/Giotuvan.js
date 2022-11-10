import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingModal from "./modalBooking";
import "./tour.css";

// vũ css
import styles from "./TourDetail.module.css";

function Goituvan() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div id="Goi-tu-van" className={styles.contactTableInner}>
      <Row>
        <div className="form-tu-van">
          <h3>Gọi để tư vấn</h3>
          <Row className="mb-3 lich-dang-ky">
            <Col>
              <div>
                <p>Ngày khởi hành</p>
              </div>
              <div>
                <p>Thời gian</p>
              </div>
              <div>
                <p>Lịch trình</p>
              </div>
              <div>
                <p>Vận chuyển</p>
              </div>
            </Col>
            <Col>
              <div>
                <p>20/10,25/10</p>
              </div>
              <div>
                <p>3 ngày2 đêm</p>
              </div>
              <div>
                <p>Hà Nội - Ninh Bình - Hà Nội</p>
              </div>
              <div>
                <p>Xe chất lượng cao</p>
              </div>
            </Col>
          </Row>

          <div className="gia-form-tu-van">
            <p className="gia-chuan">
              <span className="tien">3,000,000</span>
              <span> đồng</span>
            </p>
          </div>
          <button className="a-dat-tour" onClick={() => setModalShow(true)}>
            Đặt Tour ngay
          </button>
          <BookingModal show={modalShow} onHide={() => setModalShow(false)} />

          <div className="form-goi-lai">
            <p>Liên hệ càng sớm - Giá càng rẻ</p>
            <p>
              <img src="/asscets/img/duanmoi.png" alt="Second slide" />
            </p>
            <p>
              Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau ít
              phút !
            </p>
            <p>
              <span className="wpcf7-form-control-wrap" data-name="dien-thoai">
                <input
                  type="tel"
                  name="dien-thoai"
                  value=""
                  placeholder="Số điên thoại của bạn là"
                  className="with100"
                />
              </span>
              <br />
              <input
                type="submit"
                value="Yêu cầu gọi lại"
                className="with100 mt-2 callbackBtn"
              />
            </p>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Goituvan;
