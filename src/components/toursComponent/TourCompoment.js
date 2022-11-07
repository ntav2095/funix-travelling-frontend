// main
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

// apis
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { tourApi } from "../../services/apis";

import tours from "../../mock/tours.mock";

import styles from "./TourCompoment.module.css";

class Tour extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      tours: [],
      error: null,
    };
  }

  componentDidMount() {
    const fetchTours = async () => {
      try {
        const response = await axios({
          url: "https://funixxx.herokuapp.com/api/tour",
          method: "GET",
          withCredentials: true,
        });

        this.setState({ tours: response.data.items });
      } catch (error) {
        this.setState({ error: error.message });
      }
    };

    fetchTours();
  }
  render() {
    return (
      <Container id="background_img">
        <Row lg="3" md="1" className="row-box-shadow-2 ">
          {this.state.tours.length > 0 &&
            this.state.tours.map((tour) => (
              <Col key={tour._id} className="bg  pt-4  container_tour ">
                <Card
                  style={{
                    width: "100%",
                  }}
                >
                  <Link to={`/danh-sach-tour/${tour._id}`}>
                    <img
                      className={styles.img}
                      alt="Sample"
                      src={tour.images[0]}
                    />
                  </Link>
                  <CardBody>
                    <Link to={`/danh-sach-tour/${tour._id}`}>
                      <CardTitle tag="h5"> {tour.title} </CardTitle>
                    </Link>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {tour.time.duration}
                    </CardSubtitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {tour.journey}
                    </CardSubtitle>

                    <Container id="Tour_Chitiet ">
                      <Row xs="2">
                        <Col
                          className="gia-tien lg-6"
                          style={{ background: "rgb(230,241,255)" }}
                        >
                          <p id="chitiet-gia-tien">
                            {tour.price.from.toLocaleString()} ĐỒNG
                          </p>
                        </Col>
                        <Col
                          className="lg-6 Chi-tiet"
                          style={{ background: "rgb(255, 90, 0)" }}
                        >
                          <Link to={`/danh-sach-tour/${tour._id}`} id="chitiet">
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
