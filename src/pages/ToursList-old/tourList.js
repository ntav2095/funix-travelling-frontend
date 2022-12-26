// main
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// components
import usePageTitle from "../../hooks/usePageTitle";
import TourCard from "../../containers/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import DefaultLayout from "../../layout/DefaultLayout";
import { chevronLeft, chevronRight } from "../../assets/svgs";
// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// css
import styles from "./TourList.module.css";
import Pagination from "../../containers/Pagination";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "./tourlist.css";
import { Col } from "react-bootstrap";
import { SlickArrowLeft, SlickArrowRight } from "../../components/slickArrows";

function ToursList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
  const [search, setSearch] = useState({
    text: "",
    sort: "time-asc",
  });

  const hangdleInput = (e) => {
    setSearch({ ...search, text: e.target.value });
  };
  const hangdleChangeSelect = (e) => {
    setSearch({ ...search, sort: e.target.value });
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    // nextArrow: <button>{chevronLeft}</button>,
    // prevArrow: <button>{chevronRight}</button>,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
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

  let page = new URLSearchParams(location.search).get("page");

  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(
      tourApi.get({
        search: search.text,
        sort: search.sort,
        page: page,
        page_size: 24,
        ...cat_params,
      })
    );
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  }, [i18n.language, location.search, cat_params, search]);
  useEffect(() => {
    lazy();
  }, [data, isLoading]);
  useEffect(() => {
    const option = document.querySelectorAll("option#option");
    option.forEach((item) => {
      item.classList.add("select-items");
    });
  });
  const changePageHandler = (num) => {
    if (cat_params.cat === "vi") {
      navigate(`/tours-trong-nuoc/?page=${num}`);
    } else {
      navigate(`/tours-chau-au/?page=${num}`);
    }
  };
  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <>
      <div className="containerTourList">
        <div className="containerTitle">
          <div className={styles.title + " fs-5 text-uppercase pb-2 fw-bold"}>
            {cat_params?.cat_not === "vi" && "Danh sách tour châu Âu"}
            {cat_params?.cat === "vi" && "Danh sách tour trong nước"}
          </div>
          <div className={styles.search}>
            <div className={styles.search_container}>
              <select onChange={hangdleChangeSelect}>
                <option id="option" value={"time-asc"}>
                  Mới nhất
                </option>
                <option id="option" value={"price-asc"}>
                  Giá tăng dần
                </option>
                <option id="option" value={"price-desc"}>
                  Giá giảm dần
                </option>
                <option id="option" value={"duration-desc"}>
                  Số ngày giảm dần
                </option>
                <option id="option" value={"duration-asc"}>
                  Số ngày tăng dần
                </option>
              </select>
              <input
                type="text"
                placeholder="Nhập từ khóa"
                onChange={hangdleInput}
              />
              <div className={styles.svg}>
                <i className="fa fa-search"></i>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.slider}>
          {!data && (
            <div className={styles.container}>
              <Slider {...settings}>
                {new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
              </Slider>
            </div>
          )}
          {!data && (
            <div className={styles.container}>
              <Slider {...settings}>
                {new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
              </Slider>
            </div>
          )}
          {!data && (
            <div className={styles.container}>
              <Slider {...settings}>
                {new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
              </Slider>
            </div>
          )}
          <div className={styles.container + " tourList"}>
            {/* <Slider {...settings}> */}
            {!isLoading && data && (
              <Slider {...settings}>
                {data.data
                  .filter((tour, index) => index < 6)
                  .map((tour) => (
                    <div
                      key={tour._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
              </Slider>
            )}
            {/* {!data &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))} */}
            {/* </Slider> */}
          </div>

          <div className={styles.container + " tourList"}>
            <Slider {...settings}>
              {!isLoading &&
                data &&
                data.data
                  .filter((tour, index) => index > 5 && index < 12)
                  .map((tour) => (
                    <div
                      key={tour._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
              {/* {!data &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))} */}
            </Slider>
          </div>

          <div className={styles.container + " tourList"}>
            <Slider {...settings}>
              {!isLoading &&
                data &&
                data.data
                  .filter((tour, index) => index > 11 && index < 18)
                  .map((tour) => (
                    <div
                      key={tour._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
              {/* {!data &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))} */}
            </Slider>
          </div>

          <div className={styles.container + " tourList"}>
            <Slider {...settings}>
              {!isLoading &&
                data &&
                data.data
                  .filter((tour, index) => index > 17)
                  .map((tour) => (
                    <div
                      key={tour._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
              {/* {!data &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))} */}
            </Slider>
          </div>
        </div>

        {/* {data && (
          <div className="mt-4">
            <Pagination
              className="xxx"
              pageSize={data.metadata.page_size}
              total={data.metadata.total_count}
              current={Number(page)}
              onChange={changePageHandler}
            />
          </div>
        )} */}
      </div>
    </>
  );
}

export default ToursList;
