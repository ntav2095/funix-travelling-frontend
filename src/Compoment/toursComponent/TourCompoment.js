import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  Button,
  Container,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
class Tour extends Component {
  constructor(prop) {
    super(prop);
    this.state = "";
  }
  render() {
    return (
      <Container id="background_img">
        <Row lg="3" md="1" className="row-box-shadow-2 ">
          <Col className="bg  pt-4  container_tour ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <Link to="/TOURSLIST/1">
                  <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                </Link>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <Link to="/TOURSLIST/1" id="chitiet">
                        XEM CHI TIẾT
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>

          <Col className="bg  pt-4 ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <a href="#" id="chitiet">
                        XEM CHI TIẾT
                      </a>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
          <Col className="bg  pt-4 ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <a href="#" id="chitiet">
                        XEM CHI TIẾT
                      </a>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
          <Col className="bg  pt-4 ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <a href="#" id="chitiet">
                        XEM CHI TIẾT
                      </a>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
          <Col className="bg  pt-4 ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <a href="#" id="chitiet">
                        XEM CHI TIẾT
                      </a>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
          <Col className="bg  pt-4 ">
            <Card
              style={{
                width: "100%",
              }}
            >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5"> Tua Nha Trang 4 Ngày 3 Đêm </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  4 Ngày 3 đêm
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Nha Trang - Hà Nội -Nha Trang
                </CardSubtitle>

                <Container id="Tour_Chitiet ">
                  <Row xs="2">
                    <Col
                      className="gia-tien lg-6"
                      style={{ background: "rgb(230,241,255)" }}
                    >
                      <p id="chitiet-gia-tien">
                        <span> 5,500,550</span>
                        <span> Đồng</span>
                      </p>
                    </Col>
                    <Col
                      className="lg-6 Chi-tiet"
                      style={{ background: "rgb(255, 90, 0)" }}
                    >
                      <a href="#" id="chitiet">
                        XEM CHI TIẾT
                      </a>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Tour;
