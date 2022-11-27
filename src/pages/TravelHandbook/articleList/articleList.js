// main
import useLazyLoading, { loadingImg } from "../../../hooks/uselazyLoading";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
// components
import ArticleCard from "../ArticleCard";

// apis
import useAxios from "../../../hooks/useAxios";
import { postsApi } from "../../../services/apis";

// css
import styles from "./articleList.module.css";
import "./article.css";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import { Col } from "react-bootstrap";

function ArticleList({ page }) {
  const [sendRequestNhatKy, isLoading1, dataNhatKy, error1] = useAxios();
  const [sendRequestDiemDen, isLoading2, dataDiemDen, error2] = useAxios();
  const [sendRequestCamNang, isLoading3, dataCamnang, error3] = useAxios();
  const [sendRequestTraiNghiem, isLoading4, dataTraiNgiem, error4] = useAxios();
  console.log(dataNhatKy, dataDiemDen);
  console.log(dataCamnang, dataTraiNgiem);
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
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
  const { i18n } = useTranslation();

  useEffect(() => {
    sendRequestDiemDen(
      postsApi.get({ page: page, page_size: 6, cat: "diem-den" })
    );
    sendRequestTraiNghiem(
      postsApi.get({ page: page, page_size: 6, cat: "trai-nghiem" })
    );
    sendRequestCamNang(
      postsApi.get({ page: page, page_size: 6, cat: "cam-nang" })
    );
    sendRequestNhatKy(
      postsApi.get({ page: page, page_size: 6, cat: "nhat-ky" })
    );
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  }, [i18n.language, location.search]);

  useEffect(() => {
    lazy();
  }, [isLoading1, isLoading2, isLoading3, isLoading4]);

  return (
    <>
      <div className="pt-5 pb-5 bg-white">
        <div className={styles.slider}>
          <div className={styles.container}>
            <div
              className={
                styles.title + " fs-4 text-uppercase text-center pb-2 fw-bold"
              }
            >
              {dataDiemDen?.data.length > 0 && "Điểm đến hấp dẫn"}
            </div>
            <Slider {...settings}>
              {!isLoading1 &&
                dataDiemDen?.data.map((article) => (
                  <div
                    key={article._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              {!dataDiemDen &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
            <Link
              className={styles.articleCategory}
              to={"/cam-nang-du-lich/danh-muc/diem-den"}
            >
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          </div>

          <div className={styles.container}>
            <div
              className={
                styles.title + " fs-4 text-uppercase text-center pb-2 fw-bold"
              }
            >
              {dataTraiNgiem?.data.length > 0 && "Trải nghiệm - khám phá"}
            </div>
            <Slider {...settings}>
              {!isLoading2 &&
                dataTraiNgiem?.data.map((article) => (
                  <div
                    key={article._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              {!dataTraiNgiem &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
            <Link
              className={styles.articleCategory}
              to={"/cam-nang-du-lich/danh-muc/trai-nghiem"}
            >
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          </div>

          <div className={styles.container}>
            <div
              className={
                styles.title + " fs-4 text-uppercase text-center pb-2 fw-bold"
              }
            >
              {dataCamnang?.data.length > 0 && "Cẩm nang du lịch"}
            </div>
            <Slider {...settings}>
              {!isLoading3 &&
                dataCamnang?.data.map((article) => (
                  <div
                    key={article._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              {!dataCamnang &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
            <Link
              className={styles.articleCategory}
              to={"/cam-nang-du-lich/danh-muc/cam-nang"}
            >
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          </div>

          <div className={styles.container}>
            <div
              className={
                styles.title + " fs-4 text-uppercase text-center pb-2 fw-bold"
              }
            >
              {dataNhatKy?.data.length > 0 && "Nhật ký hành trình"}
            </div>
            <Slider {...settings}>
              {!isLoading4 &&
                dataNhatKy?.data.map((article) => (
                  <div
                    key={article._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              {!dataNhatKy &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
            <Link
              className={styles.articleCategory}
              to={"/cam-nang-du-lich/danh-muc/nhat-ky"}
            >
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleList;
