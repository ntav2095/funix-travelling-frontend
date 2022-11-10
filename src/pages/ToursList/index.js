// main
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// components
import Layout from "../../layout/Default";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import usePageTitle from "../../hooks/usePageTitle";
import TourCard from "../../containers/TourCard";
import SpinnerModal from "../../components/SpinnerModal";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// vũ css
import styles from "./TourList.module.css";

function ToursList() {
  const [sendRequest, isLoading, data, error] = useAxios();

  useEffect(() => {
    sendRequest(tourApi.get());
  }, []);

  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <Layout>
        <div className="myContainer">
          <div className={styles.breadcrumbContainer}>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>DANH SÁCH TOURS</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className={styles.container}>
            {data && data.items.length > 0 && (
              <Row lg="3" md="2" sm="1">
                {data.items.map((tour) => (
                  <Col key={tour._id} className="mb-4">
                    <TourCard tour={tour} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ToursList;
