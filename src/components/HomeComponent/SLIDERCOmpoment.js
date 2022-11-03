import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "reactstrap";
import "./silder.css";
function Sliderheader() {
  return (
    <>
      <div className="Navbar_header">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/asscets/img/slider-templates-kyco-1-1400x788.jpg"
              alt="Second slide"
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
            />
            <Carousel.Caption id="slider_h3">
              <h3>GỀNH ĐÁ PHÚ YÊN</h3>
              <p>DẤU CHÂN THIÊN ĐƯỜNG - ĐỊA ĐIỂM KHÁM PHÁ THÚ VỊ</p>
              <Button variant="primary">Xem thêm</Button>{" "}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div id="Body-content-1" className="section-content relative">
        <Container>
          <Row className="col-inner">
            <Col lg="7" sm="6">
              <div>
                <h2>Hãy chọn Travel Go</h2>
                <p className="mini">
                  1.000 lý do tại sao bạn nên chọn đến với chung tôi Travel Go,
                  có 1 thế giới tuyệt đẹp quanh ta hãy đến với chúng tôi.
                </p>
                <p className="large">
                  Với hơn 16 năm kinh nghiệm tổ chức và triển khai các tour du
                  lịch trong và ngoài nước, chúng tôi cam kết đem lại cho khách
                  hàng những hành trình tuyệt vời và ấn tượng nhất thông qua
                  những dịch vụ chuyên nghiệp mà chúng tôi thực hiện như:
                </p>
                <Row
                  className="row row-small row-tien-nghi"
                  id="row-1621253027"
                >
                  <Col
                    md="4"
                    xs="12"
                    id="col-222374657"
                    className="col medium-4 small-12 large-4"
                  >
                    <div>
                      <p>
                        <i className="fa fa-fighter-jet"></i>Chuyến bay đẳng cấp
                      </p>
                      <p style={{ marginBottom: "14px" }}>
                        <i className="fa fa-university"></i>Khách sạn tiện nghi
                      </p>
                    </div>
                  </Col>
                  <Col
                    md="4"
                    xs="12"
                    id="col-1056924566"
                    className="col medium-4 small-12 large-4"
                  >
                    <div>
                      <p>
                        <i
                          className="fa fa-ship "
                          style={{ marginBottom: "0px" }}
                        ></i>
                        Hành trình hấp dẫn
                      </p>
                      <p>
                        <i
                          style={{ marginBottom: "14px" }}
                          className="fa fa-check"
                        ></i>
                        Chất lượng đỉnh cao
                      </p>
                    </div>
                  </Col>
                  <Col
                    md="4"
                    xs="12"
                    id="col-357304621"
                    className="col medium-4 small-12 large-4"
                  >
                    <div>
                      <p>
                        <i className="fa fa-history"></i>Quản lý chặt chẽ
                      </p>
                      <p>
                        <i className="fa fa-globe"></i>Hơn 100 tours quốc tế
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg="5" md="6">
              <div>
                <div
                  className="img has-hover x md-x md-x y md-y md-y"
                  id="image_1250726040"
                  style={{ width: "100%" }}
                >
                  <div className="img-inner dark">
                    <img
                      width="100%"
                      height="auto"
                      src="asscets/img/about.png"
                      data-src="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png"
                      className="lazy-load attachment-large size-large"
                      alt=""
                      loading="lazy"
                      srcSet=""
                      data-srcset="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png 590w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-510x412.png 510w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-495x400.png 495w"
                      sizes="(max-width: 590px) 100vw, 590px"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Sliderheader;
