// main
import { useEffect } from "react";

// components
import Layout from "../../layout/Default";
import usePageTitle from "../../hooks/usePageTitle";
import HomeSlider from "./HomeSlider";
import Welcome from "./Welcome";
import TrendingTours from "./TrendingTours";
import SpinnerModal from "../../components/SpinnerModal";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

import datatour from '../../data/tour/tours'
// css
import styles from "./Home.module.css";
import EuropeTours from "./tourChauAu";
import CountryTours from "./tourTrongnuoc";
import CamNang from "./camNangDuLich";

function Home() {
  // const [sendRequest, isLoading, data, error] = useAxios();

  // useEffect(() => {
  //   sendRequest(tourApi.get());
  // }, []);
 const data={items:datatour}
  const isLoading=false
  console.log(data)
  usePageTitle("Trang chủ || Go Travel");
  return (
    <Layout>
      <div className="sliderContainer">
        <HomeSlider tours={data?.items} isLoading={isLoading} />
      </div>

      <div className="myContainer">
        <Welcome />
      </div>

      <div className="myContainer">
        <TrendingTours tours={data?.items} isLoading={isLoading} />
      </div>
      
      <div className="myContainer">
        <EuropeTours tours={data?.items} isLoading={isLoading} />
      </div>
      
      <div className="myContainer">
        <CountryTours tours={data?.items} isLoading={isLoading} />
      </div>
      
      <div className="myContainer">
        <CamNang tours={data?.items} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
export default Home;
