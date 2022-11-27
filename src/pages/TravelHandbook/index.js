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
  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <div className="container-xl pt-5">
        <ArticleList />
      </div>
    </>
  );
}

export default TravelHandbook;
