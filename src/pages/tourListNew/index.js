import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";
import { useTranslation } from "react-i18next";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import { useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import SliderCard from "../../containers/SliderCard";
// import styles from './tourList.module.css'
import "./tourlist.css";
import CustomPagination from "../../containers/customerPagination";
function ToursList({ cat_params }) {
  const { i18n } = useTranslation();
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
  const navigate = useNavigate();

  const [sendRequest, isLoading, data, error] = useAxios();
  const [search, setSearch] = useState({
    sort: "time-asc",
  });

  let page = new URLSearchParams(location.search).get("page");

  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  console.log("datatourlisst", data);
  console.log("loading", isLoading);
  const hangdleChangeSelect = (e) => {
    setSearch({ sort: e.target.value });
  };

  const changePageHandler = (num) => {
    if (cat_params.cat === "vi") {
      navigate(`/tours-trong-nuoc/?page=${num}`);
    } else {
      navigate(`/tours-chau-au/?page=${num}`);
    }
  };
  const handleLoadingSlider = (datacard) => {
    const loadingSlider =
      !isLoading && datacard ? (datacard.length == 0 ? false : true) : true;
    return loadingSlider;
  };
  useEffect(() => {
    sendRequest(
      tourApi.get({
        sort: search.sort,
        page: page,
        page_size: 24,
        ...cat_params,
      })
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search, cat_params, search]);

  useEffect(() => {
    lazy();
  }, [isLoading]);

  usePageTitle(`Danh sách tours || Go Travel`);
  console.log("tour New");
  return (
    <div className="tours__list">
      <div className={"container__header"}>
        <div className={"title text-uppercase fw-bold"}>
          {cat_params?.cat_not === "vi" && "Danh sách tour châu Âu"}
          {cat_params?.cat === "vi" && "Danh sách tour trong nước"}
        </div>
        <div className={"container__sort"}>
          <div className={"sort"}>
            <select onChange={hangdleChangeSelect}>
              <option value={"time-asc"}>Mới nhất</option>
              <option value={"price-asc"}>Giá tăng dần</option>
              <option value={"price-desc"}>Giá giảm dần</option>
              <option value={"duration-desc"}>số Ngày lưu trú giảm dần</option>
              <option value={"duration-asc"}>Số ngày lưu trú tăng dần</option>
            </select>
          </div>
        </div>
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          data={data?.data.slice(0, 6)}
          isloading={isLoading}
          page={"tour-list"}
          loadingCard={handleLoadingSlider(data?.data.slice(0, 6))}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          data={data?.data.slice(6, 12)}
          isloading={isLoading}
          page={"tour-list"}
          loadingCard={handleLoadingSlider(data?.data.slice(6, 12))}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          data={data?.data.slice(12, 18)}
          isloading={isLoading}
          page={"tour-list"}
          loadingCard={handleLoadingSlider(data?.data.slice(12, 18))}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          data={data?.data.slice(18, 24)}
          isloading={isLoading}
          page={"tour-list"}
          loadingCard={handleLoadingSlider(data?.data.slice(18, 24))}
        />
      </div>

      <div className={"container__Slider"}>
        <CustomPagination
          total={data?.metadata.total_count}
          pagenumber={Number(page)}
          callback={changePageHandler}
        />
      </div>
    </div>
  );
}
export default ToursList;
