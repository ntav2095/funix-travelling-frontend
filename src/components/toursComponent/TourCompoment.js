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
import {
  phoneNumber,
  visaBanner,
  worldMap,
  travelPic,
  aboutCompany,
} from "../../assets/images";
import { Link } from "react-router-dom";

// apis
import axios from "axios";

// assets
import { brokenImage } from "../../assets/images";

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
        <Row
          // lg="3"
          // md="2"
          // sm="1"
          className={styles.tours}
          // className={styles.tours + " row-box-shadow-2"}
        >
          {this.state.tours.length > 0 &&
            this.state.tours.map((tour) => (
              <div key={tour._id} className={" bg  pt-4  container_tour"}>
                <Card className={styles.card}>
                  <Link
                    className={styles.image}
                    to={`/danh-sach-tour/${tour._id}`}
                  >
                    <img
                      className={styles.img}
                      alt="Sample"
                      src={tour.images[0]}
                      onError={(e) => {
                        e.target.src = brokenImage;
                      }}
                    />
                  </Link>
                  <CardBody className={styles.textBox}>
                    <Link to={`/danh-sach-tour/${tour._id}`}>
                      <CardTitle tag="h5"> {tour.name} </CardTitle>
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
                          className={styles.tourBtn + " lg-6 Chi-tiet"}
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
              </div>
            ))}
        </Row>
      </Container>
    );
  }
}
export default Tour;
