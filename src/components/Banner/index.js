import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { brokenImage, hearder as bannerImg } from "../../assets/images";
import Slider from "react-slick";
import Placeholder from "../placeholders/Placeholder";
import { chevronLeft, chevronRight } from "../../assets/svgs";
import { useLocation, useNavigate } from "react-router-dom";
import { layoutApi } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import styles from "./Banner.module.css";
import "./banner.css";
import { SlickArrowLeft, SlickArrowRight } from "../slickArrows";
import { useDispatch, useSelector } from "react-redux";
import { updateBanner, setBanners } from "../../store/banner.slice";
import { countriesImages } from "../../pages/VisaService/mockImages";

const BANNERS_MAP = new Map([
  ["/", "homeSliders"],

  ["/tours-chau-au", "euTours"],
  ["/tours-trong-nuoc", "vnTours"],

  ["/cam-nang-du-lich/danh-muc/cam-nang", "handbook"],
  ["/cam-nang-du-lich/danh-muc/nhat-ky", "diary"],
  ["/cam-nang-du-lich/danh-muc/trai-nghiem", "experience"],
  ["//cam-nang-du-lich/danh-muc/diem-den", "destination"],
  ["/cam-nang-du-lich", "handbook"],

  ["/dich-vu-visa", "visa"],
]);

function Banner() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId, articleId, visaCountry } = useParams();
  console.log(visaCountry);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const banners = useSelector((state) => state.banner);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <SlickArrowLeft infinite />,
    nextArrow: <SlickArrowRight slidesToShow={1} slidesToScroll={1} infinite />,
  };

  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  useEffect(() => {
    sendRequest(layoutApi.get());
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setBanners(data.data));
    }
  }, [data]);

  console.log(location);

  return (
    <div className={styles.container}>
      {path === "/" && (
        <div className={styles.banner + " home__banner"}>
          {banners.homeSliders && (
            <Slider {...settings}>
              {banners.homeSliders.map((item, index) => (
                <div
                  key={item._id}
                  className={styles.image}
                  onClick={() => navigate(`/danh-sach-tour/${item._id}`)}
                >
                  <img
                    src={item.banner}
                    alt={"banner"}
                    onError={handlerBrokenImg}
                  />
                </div>
              ))}
            </Slider>
          )}

          {!banners.homeSliders && (
            <Slider {...settings}>
              {new Array(4).fill(1).map((item, index) => (
                <div key={index} className={styles.image}>
                  <Placeholder width="100%" height="100%" />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}

      {path !== "/" && (
        <div className={styles.banner}>
          <img
            src={
              tourId
                ? banners.tourDetail?.banner
                : articleId
                ? banners.articleDetail?.banner
                : visaCountry
                ? countriesImages[visaCountry]
                : banners[BANNERS_MAP.get(path)]?.banner
            }
            className="img-fluid w-100"
            alt="banner"
            onError={handlerBrokenImg}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Banner);
