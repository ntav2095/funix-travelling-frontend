// main
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// components
import usePageTitle from "../../hooks/usePageTitle";
import TourCard from "../../containers/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import DefaultLayout from "../../layout/DefaultLayout";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// css
import styles from "./TourList.module.css";
import Pagination from "../../containers/Pagination";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

function ToursList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();

  console.log('data',data)
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  let page = new URLSearchParams(location.search).get("page");

  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(tourApi.get({ page: page, page_size: 24, ...cat_params }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search, cat_params]);

  const changePageHandler = (num) => {
    if (cat_params.cat === "vi") {
      navigate(`/tours-trong-nuoc/?page=${num}`);
    } else {
      navigate(`/tours-chau-au/?page=${num}`);
    }
  };
  console.log('tour list')
  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <>
      <div className="pt-5 pb-5 bg-white">
        <div className="container">
        <h1 className={styles.title +" fs-4 text-uppercase text-center pb-2 fw-bold"}>
          {cat_params?.country_not === "vi" && "Danh sách tour châu Âu"}
          {cat_params?.country === "vi" && "Danh sách tour trong nước"}
        </h1>
        <div className={styles.search}>
          <div>
            <select>
              <option>Mới nhất</option>
              <option>Giá tăng dần</option>
              <option>Giá giảm dần</option>
            </select>
          </div>
        </div>
        </div>
        <div className="">
          {data &&
            data.data.length > 0 &&
            <div className={styles.container}>
            <Slider {...settings}>
            {data.data.filter((tour,index)=>index<6).map((tour) => (
              <div
                key={tour._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <TourCard tour={tour} />
              </div>
            ))}</Slider></div>
            }
            {data &&
            data.data.length > 0 &&
            <div className={styles.container}>
            <Slider {...settings}>
            {data.data.filter((tour,index)=>index>5 && index<12).map((tour) => (
              <div
                key={tour._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <TourCard tour={tour} />
              </div>
            ))}</Slider></div>
            }
            {data &&
            data.data.length > 0 &&
            <div className={styles.container}>
            <Slider {...settings}>
            {data.data.filter((tour,index)=>index>11 && index<18).map((tour) => (
              <div
                key={tour._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <TourCard tour={tour} />
              </div>
            ))}</Slider></div>
            }
            {data &&
            data.data.length > 0 &&
            <div className={styles.container}>
            <Slider {...settings}>
            {data.data.filter((tour,index)=>index>17).map((tour) => (
              <div
                key={tour._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <TourCard tour={tour} />
              </div>
            ))}</Slider></div>
            }
         
        </div>

        {data && (
          <div className="mt-4">
            <Pagination
              className="xxx"
              pageSize={data.metadata.page_size}
              total={data.metadata.total_count}
              current={Number(page)}
              onChange={changePageHandler}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ToursList;
