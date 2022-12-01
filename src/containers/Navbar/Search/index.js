import { manifyingGlass as searchSVG } from "../../../assets/svgs";

import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useSearch from "./useSearch";
import { brokenImage } from "../../../assets/images";
import styles from "./Search.module.css";
import { useTranslation } from "react-i18next";

const trans = {
  tours: {
    en: "Tours",
    vi: "Tours",
  },
  articles: {
    en: "Articles",
    vi: "Bài viết",
  },
  not_matches: {
    en: "Not matches anything",
    vi: "Không tìm thấy kết quả phù hợp",
  },
  search_for_tours: {
    en: "Search for tours",
    vi: "Tìm kiếm tour",
  },
  search_for_articles: {
    en: "Search for articles",
    vi: "Tìm kiếm bài viết",
  },
  search_more: {
    en: "Search more",
    vi: "Tìm kiếm thêm",
  },
  is_searching: {
    en: "Is searching",
    vi: "Đang tìm kiếm",
  },
  results: {
    en: "results",
    vi: "kết quả",
  },
  of: {
    en: "of",
    vi: "của",
  },
};

function Search() {
  const [isFocus, setIsFocus] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();
  const lang = useTranslation().i18n.language;

  const {
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
  } = useSearch();

  // handle click outside
  useEffect(() => {
    if (isFocus) {
      const handler = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setIsFocus(false);
          setText("");

          window.removeEventListener("mousedown", handler);
        }
      };

      window.addEventListener("mousedown", handler);

      return () => window.removeEventListener("mousedown", handler);
    }
  }, [isFocus, tours]);

  return (
    <div className={styles.searchbar} ref={searchRef}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocus(true)}
      />

      <div className={styles.spinner}>{searchSVG}</div>

      {isFocus && (
        <div className={styles.results}>
          <div className="tours border-bottom py-2">
            <h6>
              {trans.tours[lang]}{" "}
              {tours && (
                <em>
                  ({tours_count > 0 && tours_count + " " + trans.of[lang] + " "}
                  {total_tours} {trans.results[lang]})
                </em>
              )}
            </h6>
            {tours && tours.length > 0 && (
              <ul className={styles.itemsList}>
                {tours.map((tour) => (
                  <li key={tour._id}>
                    <Link
                      to={`/danh-sach-tour/${tour._id}`}
                      onClick={() => {
                        navigate(`/danh-sach-tour/${tour._id}`);
                        setIsFocus(false);
                      }}
                    >
                      <div className={styles.image}>
                        <img
                          src={tour.thumb}
                          onError={(e) => (e.target.src = brokenImage)}
                        />
                      </div>
                      <div className={styles.textbox}>
                        <p>{tour.name}</p>
                        <em>{tour.countries || tour.journey}</em>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {tours && tours.length === 0 && (
              <em className="m-0">{trans.not_matches[lang]}</em>
            )}

            {!tours && !isSearchingTours && !text.trim() && (
              <em>{trans.search_for_tours[lang]}</em>
            )}
            {isSearchingTours && <em>{trans.is_searching[lang]}</em>}
            {tours && has_more_tours && (
              <button
                className={styles.searchMoreBtn}
                onClick={searchToursNext}
              >
                {trans.search_more[lang]}
              </button>
            )}
          </div>

          <div className="articles py-2">
            <h6>
              {trans.articles[lang]}{" "}
              {articles && (
                <em>
                  (
                  {articles_count > 0 &&
                    articles_count + " " + trans.of[lang] + " "}
                  {total_articles} {trans.results[lang]})
                </em>
              )}
            </h6>
            {articles && articles.length > 0 && (
              <ul className={styles.itemsList}>
                {articles.map((article) => (
                  <li key={article._id}>
                    <Link
                      to={`/cam-nang-du-lich/${article._id}`}
                      onClick={() => {
                        navigate(`/cam-nang-du-lich/${article._id}`);
                        setIsFocus(false);
                      }}
                    >
                      <div className={styles.image}>
                        <img
                          src={article.thumb}
                          onError={(e) => (e.target.src = brokenImage)}
                        />
                      </div>
                      <div className={styles.textbox}>
                        <p>{article.title}</p>
                        <em>{article.lead.slice(0, 30)}...</em>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {articles && articles.length === 0 && (
              <em className="m-0">{trans.not_matches[lang]}</em>
            )}
            {!articles && !isSearchingArticles && !text.trim() && (
              <em>{trans.search_for_articles[lang]}</em>
            )}{" "}
            {articles && has_more_articles && (
              <button
                className={styles.searchMoreBtn}
                onClick={searchArticlesNext}
              >
                {trans.search_more[lang]}
              </button>
            )}
            {isSearchingArticles && <em> {trans.is_searching[lang]}</em>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
