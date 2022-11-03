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
import tours from "../../mock/tours.mock";

import styles from "./TourCompoment.module.css";

class Tour extends Component {
  constructor(prop) {
    super(prop);
    this.state = "";
  }
  render() {
    return (
      <Container id="background_img">
        <Row lg="3" md="2" xs="1" className="row-box-shadow-2">
          {tours.map((tour) => (
            <Col key={tour._id} className="bg  pt-4  container_tour ">
              <Card
                style={{
                  width: "100%",
                }}
              >
                <Link to={"/danh-sach-tour/1"}>
                  <img
                    className={styles.img}
                    alt="Sample"
                    src="https://picsum.photos/300/200"
                  />
                </Link>
                <CardBody>
                  <Link to={"/danh-sach-tour/1"}>
                    <CardTitle tag="h5"> {tour.title} </CardTitle>
                  </Link>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {tour.time}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {tour.destination}
                  </CardSubtitle>

                  <Container id="Tour_Chitiet ">
                    <Row xs="2">
                      <Col
                        className="gia-tien lg-6"
                        style={{ background: "rgb(230,241,255)" }}
                      >
                        <p id="chitiet-gia-tien">
                          {tour.price.toLocaleString()} ĐỒNG
                        </p>
                      </Col>
                      <Col
                        className="lg-6 Chi-tiet"
                        style={{ background: "rgb(255, 90, 0)" }}
                      >
                        <Link to="/danh-sach-tour/1" id="chitiet">
                          XEM CHI TIẾT
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default Tour;
