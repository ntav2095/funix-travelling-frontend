//
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../layout/Default";
import "./visa.css";
import React, { useState } from "react";
import Xemchitiet1 from "./xemchitiet1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Button, CardBody, Card, Input } from "reactstrap";
function Visa() {
  const [isOpen1, setIsOpen] = useState(false);
  const toggle1 = () => setIsOpen(!isOpen1);
  return (
    <Layout>
      <div id="Body-content ">
        <Container>
          <Row>
            <Col>
              <div>
                <span> Dịch Vụ Làm Visa Ý </span>
                <div className="clearfix"></div>
                <div className="col-lg-8 col-md-8">
                  <h1>Dịch Vụ Làm Visa Ý</h1>
                  <div className="visa-rating-comment">
                    <div class="box-rating-comment type-visa">
                      <p>
                        <span class="point">5/5</span>
                        <span class="box-item-star">
                          <span class="item-star">
                            <i class="fas fa-star"></i>
                          </span>
                          <span class="item-star">
                            <i class="fas fa-star"></i>
                          </span>
                          <span class="item-star">
                            <i class="fas fa-star"></i>
                          </span>
                          <span class="item-star">
                            <i class="fas fa-star"></i>
                          </span>
                          <span class="item-star">
                            <i class="fas fa-star"></i>
                          </span>
                        </span>
                        <span class="count">(1 đánh giá)</span>
                      </p>
                    </div>
                  </div>

                  <div class="visa-info-feature">
                    <ul>
                      <li>
                        <i className="fa fa-calendar"></i> Nhập cảnh sớm nhất dự
                        kiến: 21/12/2022
                      </li>
                      <li>
                        <i className="fa fa-calendar-plus"></i> Hỗ trợ 24/7
                      </li>
                      <li class="refund">Hoàn hủy miễn phí</li>
                    </ul>
                  </div>
                  <div class="visa-content-feature">
                    <ul>
                      <li>
                        Tư vấn và đưa ra giải pháp hiệu quả nhất cho hồ sơ của
                        bạn;
                      </li>
                      <li>
                        Hỗ trợ dịch thuật, công chứng giấy tờ hoàn thiện hồ sơ;
                      </li>
                      <li>Hướng dẫn điền tờ khai xin visa Ý hoàn chỉnh;</li>
                      <li>Xử lý hồ sơ nhanh chóng;</li>
                      <li>Đặt lịch hẹn với cơ quan lãnh sự;</li>
                      <li>Chia sẻ kinh nghiệm phỏng vấn visa;</li>
                      <li>
                        Tư vấn mua vé máy bay và đặt khách sạn Ý với nhiều ưu
                        đãi;
                      </li>
                      <li>Theo dõi hồ sơ và nhận visa giúp khách hàng</li>
                    </ul>
                  </div>
                </div>

                <div class="clearfix"></div>
              </div>
            </Col>
            <Col lg="4">
              <div className="form-tu-van">
                <h3>Gọi để tư vấn</h3>
                <h3>Gí chỉ từ</h3>

                <div className="gia-form-tu-van">
                  <p className="gia-chuan">
                    <span className="tien">3,000,000</span>
                    <span> đồng</span>
                  </p>
                </div>
                <a href="#dattour" className="a-dat-tour">
                  Chọn gói dịch vụ
                </a>
                <div className="form-goi-lai">
                  <p>Liên hệ càng sớm - Giá càng rẻ</p>
                  <p>
                    <img src="/asscets/img/duanmoi.png" alt="Second slide" />
                  </p>
                  <p>
                    Hoặc để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sau
                    ít phút !
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
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="dich-vu">
            <h2>Chọn gói dịch vụ</h2>
            <ul className="chi-tiet-dich-vu">
              <li>
                <div class="box-top">
                  <Row style={{ width: "100%" }}>
                    <Col lg="4">
                      <div class="box-info">
                        <h3 class="title-name">Visa Ý (Trẻ em dưới 6 tuổi)</h3>
                      </div>
                    </Col>

                    <Col lg="4" class="info-price">
                      <div class="box-action">
                        <div class="price-old"></div>
                        <div class="price-current">6,032,000 VNĐ</div>
                      </div>
                    </Col>
                    <Col>
                      <div class="box-action">
                        <button
                          onClick={toggle1}
                          style={{ marginBottom: "1rem" }}
                          class="btn-open-book-visa type-2"
                        >
                          Chọn
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <div
                    onclick="toggle_tab_info_price('.box-bottom.type-2')"
                    class="box-readmore"
                  >
                    <Xemchitiet1 />
                  </div>
                  <Collapse isOpen={isOpen1}>
                    <Card>
                      <CardBody>
                        <div class="type-0 box-book">
                          <div class="divided"></div>
                          <form method="post" action="">
                            <Row class="box-content">
                              <Col class="box-form">
                                <Row>
                                  <Col className="box-info-date">
                                    <label>Chọn ngày nhập cảnh</label>
                                    <Input
                                      id="exampleDate"
                                      name="date"
                                      placeholder="date placeholder"
                                      type="date"
                                    />
                                    <div className="box-count-date"></div>
                                  </Col>
                                  <Col id="box-info-customer">
                                    <label>Áp dụng cho</label>
                                    <div id="box-count-customer">
                                      <span
                                        onclick="APPS_POST_VISA.post_visa_system_count_customer({type:'minus',index:0})"
                                        className="minus type-icon disabled"
                                      >
                                        <span className="fas fa-minus"></span>
                                      </span>
                                      <span className="type-text">1 khách</span>
                                      <span
                                        onclick="APPS_POST_VISA.post_visa_system_count_customer({type:'plus',index:0})"
                                        className="plus type-icon"
                                      >
                                        <span className="fas fa-plus"></span>
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="box-book">
                                <Row>
                                  <Col id="box-info-price">
                                    <label>Tổng tiền</label>
                                    <div className="info-title">
                                      <span className="price">5,800,000</span>{" "}
                                      VNĐ/
                                      <span className="count">1</span> khách
                                    </div>
                                  </Col>
                                  <Col id="box-btn-submit">
                                    <button type="submit">Đặt Ngay</button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default Visa;
