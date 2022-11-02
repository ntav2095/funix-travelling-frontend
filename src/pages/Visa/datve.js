import React, { useState } from "react";
import { Collapse, Button, CardBody, Card, Input } from "reactstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "./visa.css";

function Datvisa(args) {
  let [SLkhach, setSLkhach] = useState(1);

  //   const plus = (a) => setSLkhach(a + 1);
  //   const minus = (a) => {
  //     setSLkhach(a - 1);
  //   };

  const formatter = new Intl.NumberFormat("en-US", {
    // style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  return (
    <Card>
      <CardBody>
        <div class="type-0 box-book">
          <div class="divided"></div>
          <form method="" action="">
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
                        <span
                          onClick={() => setSLkhach(SLkhach - 1)}
                          className="fas fa-minus"
                        ></span>
                      </span>
                      <span className="type-text">{SLkhach} khách</span>
                      <span
                        onclick="APPS_POST_VISA.post_visa_system_count_customer({type:'plus',index:0})"
                        className="plus type-icon"
                      >
                        <span
                          onClick={() => setSLkhach(SLkhach + 1)}
                          className="fas fa-plus"
                        ></span>
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
                      <span className="price">
                        {formatter.format(6032000 * SLkhach)}
                      </span>{" "}
                      VNĐ/
                      <span className="count">{SLkhach}</span> khách
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
  );
}

export default Datvisa;
