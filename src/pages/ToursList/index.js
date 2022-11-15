// main
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// components
import Layout from "../../layout/Default";
import usePageTitle from "../../hooks/usePageTitle";
import TourCard from "../../containers/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// css
import styles from "./TourList.module.css";
import Panavigation from "../../containers/panavigation";

const breadcrumb = [
  { href: "/", active: false, text: "trang chủ" },
  { href: "/danh-sach-tour", active: true, text: "danh sách toursssssss" },
];

function ToursList() {
  const [sendRequest, isLoading, data, error] = useAxios();

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);


  function page(e){
    console.log('page',e)
  }

  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="myContainer">
        <div className={styles.container}>
          <Row lg="3" md="2" sm="1">
            {!isLoading &&
              data &&
              data.items.length > 0 &&
              data.items.map((tour) => (
                <Col key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}

            {isLoading &&
              new Array(10).fill(1).map((item, index) => (
                <Col key={index} className="mb-4">
                  <CardPlaceholder key={index} />
                </Col>
              ))}
          </Row>
          <Panavigation totalPage={3} callback={page} />
        </div>
      </div>
    </Layout>
  );
}

export default ToursList;
