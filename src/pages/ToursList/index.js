// main
import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";

const breadcrumb = [
  { href: "/", active: false, text: "trang chủ" },
  { href: "/danh-sach-tour", active: true, text: "danh sách tours" },
];

function ToursList() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [page, setPage] = useState(1);
  const { i18n } = useTranslation();

  useEffect(() => {
    sendRequest(tourApi.get({ page: page }));
  }, [page, i18n.language]);

  function setpage(e) {
    setPage(e);
  }

  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="myContainer">
        <div className={styles.container}>
          <Row lg="3" md="2" sm="1">
            {!isLoading &&
              data &&
              data.data.length > 0 &&
              data.data.map((tour) => (
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

          <Panavigation totalPage={3} callback={setpage} />
        </div>
      </div>
    </Layout>
  );
}

export default ToursList;
