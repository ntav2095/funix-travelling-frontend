// main
import useLazyLoading, { loadingImg } from "../../../hooks/uselazyLoading";
import { useEffect } from "react";
import {  useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components


// apis
import useAxios from "../../../hooks/useAxios";
import { postsApi } from "../../../services/apis";

// css
import styles from "./articleList.module.css";
import "./article.css";
import SliderArticle from "../../../containers/SliderArticle";

function ArticleList({ page }) {
  const [sendRequestNhatKy, isLoading1, dataNhatKy, error1] = useAxios();
  const [sendRequestDiemDen, isLoading2, dataDiemDen, error2] = useAxios();
  const [sendRequestCamNang, isLoading3, dataCamnang, error3] = useAxios();
  const [sendRequestTraiNghiem, isLoading4, dataTraiNgiem, error4] = useAxios();
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search]);

  useEffect(() => {
    lazy();
  }, [isLoading1, isLoading2, isLoading3, isLoading4]);

  return (
        <div className={styles.slider}>
          <SliderArticle
            title={"điểm dến hấp dẫn"}
            data={dataDiemDen}
            loading={isLoading1}
            category={"diem-den"}
            error={error1}
          />
          <SliderArticle
            title={"trải nghiệm - khám phá"}
            data={dataTraiNgiem}
            loading={isLoading2}
            category={"trai-nghiem"}
            error={error2}
          />
          <SliderArticle
            title={"cẩm nang du lịch"}
            data={dataCamnang}
            loading={isLoading3}
            category={"cam-nang"}
            error={error3}
          />
          <SliderArticle
            title={"nhật ký hành trình"}
            data={dataNhatKy}
            loading={isLoading4}
            category={"nhat-ky"}
            error={error4}
          />
        </div>
     
  );
}

export default ArticleList;
