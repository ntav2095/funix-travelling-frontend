import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Header from "../Compomentchung/HeaderCompoment";
import Tour from "../Compomentchung/TourCompoment";
function IndividualIntervalsExample() {
  return (
    <>
      <div className="Navbar_header">
        <div className="Navbar_header-slider">
          <Header />
        </div>
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
      </div>
      <div id="Body-content" class="section-content relative">
        <div class="row" id="row-159726792">
          <div id="col-255806587" class="col medium-7 small-12 large-7">
            <div class="col-inner">
              <h2>Hãy chọn Travel Go</h2>
              <p class="mini">
                1.000 lý do tại sao bạn nên chọn đến với chung tôi Travel Go, có
                1 thế giới tuyệt đẹp quanh ta hãy đến với chúng tôi.
              </p>
              <p class="large">
                Với hơn 16 năm kinh nghiệm tổ chức và triển khai các tour du
                lịch trong và ngoài nước, chúng tôi cam kết đem lại cho khách
                hàng những hành trình tuyệt vời và ấn tượng nhất thông qua những
                dịch vụ chuyên nghiệp mà chúng tôi thực hiện như:
              </p>
              <div class="row row-small row-tien-nghi" id="row-1621253027">
                <div id="col-222374657" class="col medium-4 small-12 large-4">
                  <div class="col-inner">
                    <p>
                      <i class="fa fa-fighter-jet"></i>Chuyến bay đẳng cấp
                    </p>
                    <p>
                      <i class="fa fa-university"></i>Khách sạn tiện nghi
                    </p>
                  </div>
                </div>

                <div id="col-1056924566" class="col medium-4 small-12 large-4">
                  <div class="col-inner">
                    <p>
                      <i class="fa fa-ship"></i>Hành trình hấp dẫn
                    </p>
                    <p>
                      <i class="fa fa-check"></i>Chất lượng đỉnh cao
                    </p>
                  </div>
                </div>

                <div id="col-357304621" class="col medium-4 small-12 large-4">
                  <div class="col-inner">
                    <p>
                      <i class="fa fa-history"></i>Quản lý chặt chẽ
                    </p>
                    <p>
                      <i class="fa fa-globe"></i>Hơn 100 tours quốc tế
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="col-2080754359" class="col medium-5 small-12 large-5">
            <div class="col-inner">
              <div
                class="img has-hover x md-x lg-x y md-y lg-y"
                id="image_1250726040"
                style={{ width: "30%" }}
              >
                <div class="img-inner dark">
                  <img
                    width="590"
                    height="477"
                    src="asscets/img/about.png"
                    data-src="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png"
                    class="lazy-load attachment-large size-large"
                    alt=""
                    loading="lazy"
                    srcset=""
                    data-srcset="https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about.png 590w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-510x412.png 510w, https://dulich4.dichvuweb.biz/wp-content/uploads/2018/12/about-495x400.png 495w"
                    sizes="(max-width: 590px) 100vw, 590px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Body-content ">
        <h1 id="Body-content_tour">Tour Trong Nước</h1>
        <Tour />
      </div>
    </>
  );
}

export default IndividualIntervalsExample;
