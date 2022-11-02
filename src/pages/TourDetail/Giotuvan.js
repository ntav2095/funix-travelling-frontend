import React from "react";
import "./tour.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import BookingModal from './modalBooking'
import Button from "react-bootstrap/Button";
function Goituvan() {
  const [modalShow, setModalShow] = React.useState(false)
  console.log(modalShow)
  return (
    <Container id="Goi-tu-van" >
      <Row>
        {/*<Col xs={8}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/asscets/img/slider-templates-kyco-1-1400x788.jpg"
                alt="Second slide"
                style={{ height: "auto", width: "100%" }}
              />
              <div className="caption">
                <Carousel.Caption id="slider_h3" interval={1000}>
                  <h3>GỀNH ĐÁ PHÚ YÊN</h3>
                  <p>DẤU CHÂN THIÊN ĐƯỜNG - ĐỊA ĐIỂM KHÁM PHÁ THÚ VỊ</p>
                  <Button variant="primary">Xem thêm</Button>{" "}
                </Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/asscets/img/slider-templates-ghenh-da-2-1400x788.jpg"
                alt="Third slide"
                style={{ height: "auto", width: "100%" }}
              />
              <Carousel.Caption id="slider_h3">
                <h3>GỀNH ĐÁ PHÚ YÊN</h3>
                <p>DẤU CHÂN THIÊN ĐƯỜNG - ĐỊA ĐIỂM KHÁM PHÁ THÚ VỊ</p>
                <Button variant="primary">Xem thêm</Button>{" "}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col> */}
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
            <button  className="a-dat-tour" onClick={()=>setModalShow(true)}>
              Đặt Tour ngay 
            </button>
            <BookingModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

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
                <span
                  className="wpcf7-form-control-wrap"
                  data-name="dien-thoai"
                >
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
                  className="with100 mt-2"
                />
              </p>
            </div>
          </div>
        {/* </Col> */}
      </Row>
    </Container>
  );
}

export default Goituvan;
