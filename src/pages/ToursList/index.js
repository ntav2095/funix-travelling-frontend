import Layout from "../../layout/Default";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tour from "../../Compoment/toursComponent/TourCompoment";

function ToursList() {
  return (
    <Layout>
      <div id="Body-content ">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>DANH SÁCH TOURS</Breadcrumb.Item>
        </Breadcrumb>
        <Tour />
      </div>
    </Layout>
  );
}

export default ToursList;
