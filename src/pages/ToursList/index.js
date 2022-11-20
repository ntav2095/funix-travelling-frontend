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

function ToursList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();

  let page = new URLSearchParams(location.search).get("page");

  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(tourApi.get({ page: page, page_size: 8, ...cat_params }));
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

  usePageTitle(`Danh sách tours || Go Travel`);

  return (
    <>
      <div className="pt-5 pb-5 bg-white">
        <h1 className="fs-4 text-uppercase text-center pb-2 fw-bold">
          {cat_params?.country_not === "vi" && "Danh sách tour châu Âu"}
          {cat_params?.country === "vi" && "Danh sách tour trong nước"}
        </h1>
        <div className="row">
          {data &&
            !isLoading &&
            data.data.length > 0 &&
            data.data.map((tour) => (
              <div
                key={tour._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <TourCard tour={tour} />
              </div>
            ))}

          {isLoading &&
            new Array(10).fill(1).map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <CardPlaceholder key={index} />
              </div>
            ))}
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
