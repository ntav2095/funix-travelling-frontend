// components
import Layout from "../../layout/Default";
import usePageTitle from "../../hooks/usePageTitle";
import HomeSlider from "./HomeSlider";
import Welcome from "./Welcome";
import TrendingTours from "./TrendingTours";

// vũ css
import styles from "./Home.module.css";

function Home() {
  usePageTitle("Trang chủ || Go Travel");
  return (
    <Layout>
      <div className="sliderContainer">
        <HomeSlider />
      </div>

      <div className="myContainer">
        <Welcome />
      </div>

      <div className="myContainer">
        <TrendingTours />
      </div>
    </Layout>
  );
}
export default Home;
