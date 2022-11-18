// main
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../../services/apis";

// components
import SpinnerModal from "../../components/SpinnerModal";
import Layout from "../../layout/Default";
import ArticleCard from "./ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Pagination from "../../containers/Pagination";

// hooks
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

// css
import styles from "./TravelHandbook.module.css";
import { useTranslation } from "react-i18next";

function TravelHandbook() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();
  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changePageHandler = (num) => {
    navigate(`/cam-nang-du-lich/?page=${num}`);
  };

  useEffect(() => {
    sendRequest(postsApi.get({ page: page, page_size: 8 }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page, i18n.language]);

  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <Layout>
        <div className="myContainer">
          <div className={styles.container}>
            <div className="row">
              {!isLoading &&
                data &&
                data.data.length > 0 &&
                data.data.map((article) => (
                  <div
                    key={article._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}

              {isLoading &&
                new Array(8).fill(1).map((item, index) => (
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
                  pageSize={data.metadata.page_size}
                  total={data.metadata.total_count}
                  current={Number(page)}
                  onChange={changePageHandler}
                />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default TravelHandbook;
