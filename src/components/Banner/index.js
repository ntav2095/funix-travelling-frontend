import styles from "./Banner.module.css";
import React, { useEffect, useState } from "react";
import { brokenImage, hearder as bannerImg } from "../../assets/images";
import Slider from "react-slick";
import Placeholder from "../placeholders/Placeholder";
import {hearder,giangsinh,giangsinh2}from '../../assets/images/index'
import { useLocation } from "react-router-dom";
import './banner.css'
import { layoutApi } from "../../services/apis";
import useAxios from '../../hooks/useAxios'

function Banner() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const pathPage=useLocation()
  const images=data?.data.images
console.log('page path',data)
  // const data={
  //   home:{slider:[giangsinh,hearder,giangsinh2,hearder,giangsinh2], session:[]},
  //   tourEu:hearder,
  //   tourVn:giangsinh2,
  //   guides:giangsinh,
  //   image:hearder
  // }
  // const isLoading=false
  const handleBanner=()=>{
    const path=pathPage.pathname
    console.log('path',path)
    if(images){
    if(path=="/tours-chau-au"){
      return images.eu_tours
    }else if(path=="/tours-trong-nuoc"){
      return images.vn_tours
    }else if(path=="/cam-nang-du-lich"){
      return images.guides
    }
    return images.vi_tours}
  }

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed:2500,
  };

  const handlerBrokenImg = (e) => {
    e.target.src = brokenImage;
  };

  useEffect(() => {
    sendRequest(layoutApi.get())
  }, [])
  

  return (
    <>
    {pathPage.pathname==='/'
      ?<div className={styles.banner}>
        {!isLoading && (
        <Slider {...settings} >
          {images?.home.map((item,index) => (
          <div
            key={index}
            className={styles.image}
          >
            <img src={item} alt={'baner'} onError={handlerBrokenImg} />
          </div>
          ))}
        </Slider>)}
        {isLoading && (
          <Slider
            {...settings}
          >
            {new Array(4).fill(1).map((item, index) => (
              <div
                key={index}
                className={styles.image}
              >
                <Placeholder width="100%" height="100%" />
              </div>
            ))}
          </Slider>
        )}
      </div>
      :(
        <div className={styles.banner}>
          <img src={handleBanner()} className="img-fluid w-100" alt="banner" onError={handlerBrokenImg}/>
        </div>
        )}
    </>
  );
}

export default React.memo(Banner);
