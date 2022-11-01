import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "./visa.css";
function Xemchitiet1(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.StrictMode>
      <p onClick={toggle} style={{ marginBottom: "1rem" }} id="xem-chi-tiet">
        Xem chi tiết <i class="fas fa-chevron-down"></i>
      </p>
      <Collapse isOpen={isOpen} {...args}>
        <Card>
          <CardBody>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        Chi tiết phiếu dịch vụ
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Giá bao gồm</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3">Điều kiện và điều khoản</Nav.Link>
                    </Nav.Item>{" "}
                    <Nav.Item>
                      <Nav.Link eventKey="4">Chính sách hủy đặt chỗ</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div
                        role="tabpanel"
                        class="tab-pane active"
                        id="details_services_4"
                      >
                        <p>
                          <strong>Chi tiết phiếu dịch vụ</strong>
                        </p>

                        <p>
                          <span style={{ color: "#0066cc" }}>
                            <strong>
                              Hồ sơ chứng minh công việc xin visa Ý:
                            </strong>
                          </span>
                        </p>

                        <p>
                          - Đối với công nhân, viên chức: Hợp đồng lao động hoặc
                          giấy bổ nhiệm chức vụ còn hiệu lực, bảng lương trong
                          vòng 3 tháng, giấy xin nghỉ phép đi Ý&nbsp;hoặc quyết
                          định cử đi công tác có sự đồng ý và xác nhận của công
                          ty.
                        </p>

                        <p>
                          -&nbsp; Đối với chủ doanh nghiệp: Giấy phép đăng ký
                          kinh doanh, sao kê tài khoản ngân hàng của doanh
                          nghiệp, giấy tờ thanh toán thuế trong 3 tháng gần đây.
                        </p>

                        <p>
                          - Nếu đã&nbsp;nghỉ hưu: Sổ lương hưu, giấy nghỉ hưu,
                          thẻ hưu trí.
                        </p>

                        <p>
                          - Nếu là học sinh/sinh viên: thẻ học sinh/sinh viên,
                          đơn xin nghỉ phép&nbsp;để đi Ý có xác nhận của nhà
                          trường.
                        </p>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div
                        role="tabpanel"
                        class="tab-pane active"
                        id="price_included_4"
                      >
                        <p>
                          <strong>Giá đã bao gồm:</strong>
                        </p>

                        <p>• Tư vấn giải pháp xin visa Ý.</p>

                        <p>• Hướng dẫn chuẩn bị hồ sơ xin visa.</p>

                        <p>• Dịch thuật các giấy tờ chứng minh công việc.</p>

                        <p>
                          • Xử lý, hoàn thiện hồ sơ chứng minh công
                          việc&nbsp;xin visa Ý.
                        </p>

                        <p>• Phí dịch vụ</p>

                        <p>
                          <strong>Giá không bao gồm:</strong>
                        </p>

                        <p>• Phí chuẩn bị hồ sơ ngoài chứng minh công việc</p>

                        <p>• Phí gửi hồ sơ qua bưu điện</p>

                        <p>• Bảo hiểm du lịch</p>

                        <p>• Chứng minh tài chính</p>

                        <p>• Phí xử lý hồ sơ khẩn.</p>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="3">
                      <div
                        role="tabpanel"
                        class="tab-pane active"
                        id="info_rule_4"
                      >
                        <p>
                          <strong>Điều kiện và điều khoản</strong>
                        </p>

                        <p>
                          • Phí dịch vụ chứng minh công việc có thể thay đổi tùy
                          từng trường hợp và thời điểm.
                        </p>

                        <p>
                          • Vui lòng chuẩn bị giấy tờ chứng minh công việc xin
                          visa&nbsp;trước khởi hành ít nhất 1 tháng.
                        </p>

                        <p>
                          • Bạn sẽ được hoàn đầy đủ tiền nếu huỷ dịch vụ trước
                          ít nhất 1 tháng.
                        </p>

                        <p>
                          • Nếu hồ sơ của bạn bị từ chối, bạn sẽ được hoàn lại
                          tiền (tùy trường hợp cụ thể)
                        </p>

                        <p>• Visa được cấp dưới dạng visa dán.</p>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <div
                        role="tabpanel"
                        class="tab-pane active"
                        id="info_policy_4"
                      >
                        <p>
                          <strong>Hủy đặt chỗ:</strong>
                        </p>
                        <p>
                          • Trước ngày đã chọn 16 ngày, phí huỷ 10% ngày trước
                          ngày đã chọn, phí huỷ 50%
                        </p>
                        <p> • Từ 0 - 7 ngày trước ngày đã chọn, phí huỷ 100%</p>
                        <p> • Chi tiết vui lòng</p>
                        liên hệ&nbsp;
                        <span style={{ color: "#FF0000" }}>
                          <strong>Hotline 1900 3498</strong>
                        </span>
                        &nbsp;để được hỗ trợ chu đáo!
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </CardBody>
        </Card>
      </Collapse>
    </React.StrictMode>
  );
}

export default Xemchitiet1;
