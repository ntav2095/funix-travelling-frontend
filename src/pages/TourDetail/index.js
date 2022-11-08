import Goituvan from "./Giotuvan";
import Mota from "./Mota";
import Layout from "../../layout/Default";
import SlideImage from "./slideimage";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import { Col, Container, Row } from "react-bootstrap";

const imageArr = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
];

function TourDetail() {
  return (
    <Layout>
      <Container>
        <Row className="tour-detail">
          <Col lg="8" sm="12" style={{ width: "70%" }}>
            <SlideImage input={imageArr} ratio={`3:2`} mode={`manual`} />
          </Col>
          <Col lg="4" sm="12" style={{ width: "30%" }}>
            <Goituvan />
          </Col>
        </Row>
        <div className="tour-detail">
          <Mota />
        </div>
      </Container>
    </Layout>
  );
}

export default TourDetail;
