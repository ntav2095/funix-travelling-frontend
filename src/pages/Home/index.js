import Sliderheader from "../../components/HomeComponent/SLIDERCOmpoment";
import Tour from "../../components/toursComponent/TourCompoment";
import Layout from "../../layout/Default";

function Home() {
  return (
    <Layout>
      <Sliderheader />
      <div id="Body-content ">
        <h1 id="Body-content_tour">Tour Trong Nước</h1>
        <Tour />
      </div>
    </Layout>
  );
}
export default Home;
