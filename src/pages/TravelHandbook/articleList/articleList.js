// main
import useLazyLoading, { loadingImg } from "../../../hooks/uselazyLoading";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
// components
import ArticleCard from "../ArticleCard";

// apis
import useAxios from "../../../hooks/useAxios";
import { postsApi } from "../../../services/apis";


// css
import styles from "./articleList.module.css";
import './article.css'


function ArticleList({page}) {
  const [sendRequestNhatKy, isLoading1, dataNhatKy, error1] = useAxios();
  const [sendRequestDiemDen, isLoading2, dataDiemDen, error2] = useAxios();
  const [sendRequestCamNang, isLoading3, dataCamnang, error3] = useAxios();
  const [sendRequestTraiNghiem, isLoading4, dataTraiNgiem, error4] = useAxios();
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
 console.log(dataNhatKy,dataDiemDen)
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
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
    ],
  };
  const {i18n}=useTranslation()

  useEffect(() => {
    sendRequestNhatKy(postsApi.get({ page: page, page_size: 6,cat:'nhat-ky'}));
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  }, [i18n.language, location.search]);

  useEffect(() => {
    sendRequestDiemDen(postsApi.get({ page: page, page_size: 24,cat:'diem-den'  }));
   
  }, [i18n.language, location.search ]);
  useEffect(() => {
    sendRequestCamNang(postsApi.get({ page: page, page_size: 24,cat:'cam-nang'  }));
   
  }, [i18n.language, location.search ]);
  useEffect(() => {
    sendRequestTraiNghiem(postsApi.get({ page: page, page_size: 24,cat:'trai-nghiem'  }));
   
  }, [i18n.language, location.search ]);

  useEffect(() => {
    lazy();
  },[isLoading1,isLoading2,isLoading3,isLoading4]);


  return (
    <>
      <div className="pt-5 pb-5 bg-white">
        <div className={styles.slider}>
          {dataDiemDen &&
            dataDiemDen.data.length > 0 &&
            <div className={styles.container}>
            <div className={styles.title +" fs-4 text-uppercase text-center pb-2 fw-bold"}>
              Điểm đến hấp dẫn
            </div>
            <Slider {...settings}>
            {dataDiemDen.data.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ArticleCard article={article} />
              </div>
            ))}</Slider></div>
            }
            {dataTraiNgiem &&
            dataTraiNgiem.data.length > 0 &&
            <div className={styles.container}>
              <div className={styles.title +" fs-4 text-uppercase text-center pb-2 fw-bold"}>
              Trải nghiệm - khám phá
            </div>
            <Slider {...settings}>
            {dataTraiNgiem.data.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ArticleCard article={article} />
              </div>
            ))}</Slider></div>
            }
            {dataCamnang &&
            dataCamnang.data.length > 0 &&
            <div className={styles.container}>
              <div className={styles.title +" fs-4 text-uppercase text-center pb-2 fw-bold"}>
              Cẩm nang du lịch
            </div>
            <Slider {...settings}>
            {dataCamnang.data.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ArticleCard article={article} />
              </div>
            ))}</Slider></div>
            }
            {dataNhatKy &&
            dataNhatKy.data.length > 0 &&
            <div className={styles.container}>
              <div className={styles.title +" fs-4 text-uppercase text-center pb-2 fw-bold"}>
              Nhật ký hành trình
            </div>
            <Slider {...settings}>
            {dataNhatKy.data.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ArticleCard article={article} />
              </div>
            ))}</Slider></div>
            }
         
        </div>
      </div>
    </>
  );
}

export default ArticleList;
