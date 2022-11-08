import Layout from "../../layout/Default";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tour from "../../components/toursComponent/TourCompoment";

function ToursList() {
  return (
    <Layout>
      <div id="Body-content">
        <div id="Body-content-1">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>DANH SÁCH TOURS</Breadcrumb.Item>
          </Breadcrumb>
          <Tour />
        </div>
      </div>
    </Layout>
  );
}

export default ToursList;
