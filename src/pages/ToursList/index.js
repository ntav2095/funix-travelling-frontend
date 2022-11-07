import Layout from "../../layout/Default";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tour from "../../components/toursComponent/TourCompoment";

// vũ css
import styles from "./TourList.module.css";

function ToursList() {
  return (
    <Layout>
      <div id="Body-content" className={styles.breadcrumbContainer}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>DANH SÁCH TOURS</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div id="Body-content" className={styles.container}>
        <Tour />
      </div>
    </Layout>
  );
}

export default ToursList;
