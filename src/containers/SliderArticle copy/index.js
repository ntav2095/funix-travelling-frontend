//package
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";

//compument
import ArticleCard from "../../pages/TravelHandbook/ArticleCard";
import { SlickArrowLeft, SlickArrowRight } from "../../components/slickArrows";
//hook

//css
import "./article.css";
import styles from "./slider.module.css";

function SliderVisa({ title, data, loading, category }) {
  const { i18n } = useTranslation();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SlickArrowRight slidesToShow={4} slidesToScroll={1} />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
          nextArrow: <SlickArrowRight slidesToShow={4} slidesToScroll={1} />,
          prevArrow: <SlickArrowLeft />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
          nextArrow: <SlickArrowRight slidesToShow={4} slidesToScroll={1} />,
          prevArrow: <SlickArrowLeft />,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          nextArrow: <SlickArrowRight slidesToShow={4} slidesToScroll={1} />,
          prevArrow: <SlickArrowLeft />,
        },
      },
    ],
  };
  return (
    <div className={styles.container + " slider_Article"}>
      <div className={styles.title + " fs-4 text-uppercase pb-2 fw-bold"}>
        {`${title}`}
      </div>
      <Slider {...settings}>
        {!loading &&
          data &&
          data.data.map((article) => (
            <div
              key={article._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <ArticleCard article={article} />
              <Link
                className={styles.articleCategory}
                to={`/cam-nang-du-lich/danh-muc/${category}`}
              >
                {i18n.language == "vi" ? "Xem thêm..." : "see more..."}
              </Link>
            </div>
          ))}
      </Slider>
      {!data &&
        new Array(6).fill(1).map((item, index) => (
          <Col key={index} className="mb-4">
            <CardPlaceholder />
          </Col>
        ))}
    </div>
  );
}

export default SliderVisa;
