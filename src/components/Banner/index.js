import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

function Banner() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const pathPage = useLocation();
  const navigate = useNavigate();
  const images = data?.data.images;
  const imagehome = useSelector((state) => state.banner.image.home);
  const imagetourdetail = useSelector((state) => state.banner.image.tourdetail);
  const imageArticleDetail = useSelector(
    (state) => state.banner.image.articledetail
  );
  const imageArr = [...imagehome.trongNuoc];
  if (imagehome.chauAu) {
    imageArr.concat(imagehome.chauAu);
  }

  const handleBanner = () => {
    const path = pathPage.pathname;

    if (images) {
      if (path == "/tours-chau-au") {
        return images.eu_tours;
      } else if (path == "/tours-trong-nuoc") {
        return images.vn_tours;
      } else if (path == "/cam-nang-du-lich") {
        return images.guides;
      } else if (path == `/danh-sach-tour/${imagetourdetail?.id}`) {
        return imagetourdetail?.image;
      } else if (path == `/danh-sach-tour/${imagetourdetail?.id}`) {
        return imagetourdetail?.image;
      } else if (path == `/cam-nang-du-lich/${imageArticleDetail?.id}`) {
        return imageArticleDetail?.image;
      }
    }
  };

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

  return (
    <>
      {pathPage.pathname === "/" ? (
        <div className={styles.banner + " home__banner"}>
          {imagehome && (
            <Slider {...settings}>
              {imageArr?.map((item, index) => (
                <div
                  key={index}
                  className={styles.image}
                  onClick={() => navigate(`/danh-sach-tour/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={"baner"}
                    onError={handlerBrokenImg}
                  />
                </div>
              ))}
            </Slider>
          )}
          {!imagehome && (
            <Slider {...settings}>
              {new Array(4).fill(1).map((item, index) => (
                <div key={index} className={styles.image}>
                  <Placeholder width="100%" height="100%" />
                </div>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <div className={styles.banner}>
          {console.log("handleBanner", handleBanner())}
          {!handleBanner() ? (
            <div className={styles.image}>
              <Placeholder width="100%" height="100%" />
            </div>
          ) : (
            <img
              src={handleBanner()}
              className="img-fluid w-100"
              alt="banner"
              onError={handlerBrokenImg}
            />
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(Banner);
