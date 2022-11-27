import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { tourApi, postsApi } from "../../../services/apis";
import { debounce } from "debounce";

function useSearch() {
  const [tourPage, setTourPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const [text, setText] = useState("");

  const [searchTours, isSearchingTours, tourData, tourError, resetTourResults] =
    useAxios();
  const [
    searchArticles,
    isSearchingArticles,
    articleData,
    articleError,
    resetSearchArticles,
  ] = useAxios();

  const [tours, setTours] = useState(null);
  const [articles, setArticles] = useState(null);

  const searchToursNext = () => {
    setTourPage((prev) => prev + 1);
  };

  const searchArticlesNext = () => {
    setArticlePage((prev) => prev + 1);
  };

  const searchBoth = debounce((query) => {
    searchTours(tourApi.get({ search: query }));
    searchArticles(postsApi.get({ search: query }));
  }, 300);

  // khi text thay đổi thì set page = 1, reset lại kết quả, search cả 2
  useEffect(() => {
    if (text.trim()) {
      setTourPage(1);
      setArticlePage(1);
      setTours(null);
      setArticles(null);
      searchBoth(text);
      return () => searchBoth.clear();
    }

    if (!text.trim()) {
      resetSearchArticles();
      resetTourResults();

      setTours(null);
      setArticles(null);
    }
  }, [text]);

  // khi page thay đổi và > 1 thì search cái thay đổi
  useEffect(() => {
    if (text && tourPage > 1) {
      searchTours(tourApi.get({ text, page: tourPage }));
    }
  }, [tourPage]);

  useEffect(() => {
    if (text && articlePage > 1) {
      searchArticles(postsApi.get({ text, page: articlePage }));
    }
  }, [articlePage]);

  // fetched được data thì push/thêm vô mảng kết quả
  // tùy vào search từ đầu hay search tiếp mà push hoặc thêm
  useEffect(() => {
    if (tourData) {
      if (!tours) {
        setTours(tourData.data);
      } else {
        setTours((prev) => [...prev, ...tourData.data]);
      }
    }
  }, [tourData]);

  useEffect(() => {
    if (articleData) {
      if (!articles) {
        setArticles(articleData.data);
      } else {
        setArticles((prev) => [...prev, ...articleData.data]);
      }
    }
  }, [articleData]);

  const total_tours = tourData?.metadata.total_count;
  const total_articles = articleData?.metadata.total_count;
  const tours_count = tours?.length;
  const articles_count = articles?.length;
  const has_more_tours = tourData?.metadata.has_more;
  const has_more_articles = articleData?.metadata.has_more;

  return {
    text,
    setText,
    tours,
    articles,
    isSearchingTours,
    isSearchingArticles,
    searchToursNext,
    searchArticlesNext,
    total_tours,
    total_articles,
    tours_count,
    articles_count,
    has_more_tours,
    has_more_articles,
  };
}

export default useSearch;
