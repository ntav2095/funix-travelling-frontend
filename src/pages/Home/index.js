import Sliderheader from "../../components/HomeComponent/SLIDERCOmpoment";
import Tour from "../../components/toursComponent/TourCompoment";
import Layout from "../../layout/Default";

// vũ css
import styles from "./Home.module.css";
function Home() {
  return (
    <Layout>
      <Sliderheader />
      <div id="Body-content" className={styles.toursListContainer}>
        <div className={styles.container}>
          <h1 id="Body-content_tour" className={styles.title}>
            Tour Trong Nước
          </h1>
          <Tour />
        </div>
      </div>
    </Layout>
  );
}
export default Home;
