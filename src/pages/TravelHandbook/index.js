// main
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../../services/apis";

// components
import SpinnerModal from "../../components/SpinnerModal";
import ArticleCard from "./ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Pagination from "../../containers/Pagination";

// hooks
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

// css
import styles from "./TravelHandbook.module.css";
import { useTranslation } from "react-i18next";
import Banner from "../../components/Banner";
import DefaultLayout from "../../layout/DefaultLayout";
import ArticleList from "./articleList/articleList";

function TravelHandbook() {
  const location = useLocation();
  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
 
  const navigate = useNavigate();

  const changePageHandler = (num) => {
    navigate(`/cam-nang-du-lich/?page=${num}`);
  };



  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <div className="container-xl pt-5">
       
        <ArticleList page={Number(page)}/>
       
          <div className="mt-4">
            <Pagination
              pageSize={40}
              total={2}
              current={Number(page)}
              onChange={changePageHandler}
            />
          </div>
     
      </div>
    </>
  );
}

export default TravelHandbook;
