import { Container } from "react-bootstrap";
import Sliderheader from "../../components/HomeComponent/SLIDERCOmpoment";
import Tour from "../../components/toursComponent/TourCompoment";
import Layout from "../../layout/Default";

function Home() {
  return (
    <Layout>
      <Sliderheader />
      <div id="Body-content">
        <div id="Body-content-1">
          <h1 id="Body-content_tour">Tour Trong Nước</h1>
          <Tour />
        </div>
      </div>
    </Layout>
  );
}
export default Home;
