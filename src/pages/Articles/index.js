import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useTranslation } from "react-i18next";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import { useLocation } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

import "./articleList.css";
import SliderCard from "../../containers/SliderCard";
import { postsApi } from "../../services/apis";

function ArticleList() {
  const { i18n } = useTranslation();
  const [lazy] = useLazyLoading(loadingImg);

  const [sendRequestNhatKy, isLoading1, dataNhatKy, error1] = useAxios();
  const [sendRequestDiemDen, isLoading2, dataDiemDen, error2] = useAxios();
  const [sendRequestCamNang, isLoading3, dataCamnang, error3] = useAxios();
  const [sendRequestTraiNghiem, isLoading4, dataTraiNgiem, error4] = useAxios();
  const handleLoadingSlider = (datacard, isLoading) => {
    const loadingSlider =
      !isLoading && datacard ? (datacard.length == 0 ? false : true) : true;
    return loadingSlider;
  };

  useEffect(() => {
    sendRequestDiemDen(postsApi.get({ page_size: 6, cat: "diem-den" }));
    sendRequestTraiNghiem(postsApi.get({ page_size: 6, cat: "trai-nghiem" }));
    sendRequestCamNang(postsApi.get({ page_size: 6, cat: "cam-nang" }));
    sendRequestNhatKy(postsApi.get({ page_size: 6, cat: "nhat-ky" }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language]);

  useEffect(() => {
    lazy();
  }, [isLoading1, isLoading2, isLoading3, isLoading4]);

  usePageTitle(`Danh sách tours || Go Travel`);
  return (
    <div className="article__list">
      <div className={"container__Slider"}>
        <SliderCard
          title={"Điểm đến hấp dẫn"}
          data={dataDiemDen?.data}
          isloading={isLoading1}
          page={"article"}
          naviga={"/cam-nang-du-lich/danh-muc/diem-den"}
          loadingCard={handleLoadingSlider(dataDiemDen, isLoading1)}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          title={"Trải nghiệm - khám phá"}
          data={dataTraiNgiem?.data}
          isloading={isLoading2}
          naviga={"/cam-nang-du-lich/danh-muc/trai-nghiem"}
          page={"article"}
          loadingCard={handleLoadingSlider(dataTraiNgiem, isLoading2)}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          title={"Cẩm nang du lịch"}
          data={dataCamnang?.data}
          isloading={isLoading3}
          naviga={"/cam-nang-du-lich/danh-muc/cam-nang"}
          page={"article"}
          loadingCard={handleLoadingSlider(dataCamnang, isLoading3)}
        />
      </div>

      <div className={"container__Slider"}>
        <SliderCard
          title={"Nhật ký hành trình"}
          data={dataNhatKy?.data}
          isloading={isLoading4}
          naviga={"/cam-nang-du-lich/danh-muc/nhat-ky"}
          page={"article"}
          loadingCard={handleLoadingSlider(dataNhatKy, isLoading4)}
        />
      </div>
    </div>
  );
}
export default ArticleList;
