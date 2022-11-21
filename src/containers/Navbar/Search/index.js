import { manifyingGlass as searchSVG } from "../../../assets/svgs";

import styles from "./Search.module.css";
import Spinner from "../../../components/Spinner";
import useAxios from "../../../hooks/useAxios";
import { tourApi, postsApi } from "../../../services/apis";
import { useEffect } from "react";
import { debounce } from "debounce";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useSearch from "./useSearch";

function Search() {
  const [isFocus, setIsFocus] = useState(false);
  const searchRef = useRef();

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

  console.log(isSearchingTours);
  console.log(tours?.map((item) => item._id));

  // handle click outside
  useEffect(() => {
    if (isFocus) {
      const handler = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setIsFocus(false);
          setText("");

          window.removeEventListener("click", handler);
        }
      };

      window.addEventListener("click", handler);

      return () => window.removeEventListener("click", handler);
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
            <h6>Tours {tours && <em>({total_tours} results)</em>}</h6>
            {tours && tours.length > 0 && (
              <ul className={styles.itemsList}>
                {tours.map((tour) => (
                  <li key={tour._id}>
                    <div className={styles.image}>
                      <img src={tour.thumb} />
                    </div>
                    <div className={styles.textbox}>
                      <p>{tour.name}</p>
                      <em>{tour.countries || tour.journey}</em>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {tours && tours.length === 0 && (
              <em className="m-0">Not matches anything</em>
            )}

            {!tours && !isSearchingTours && !text && <em>Search for tours</em>}
            {isSearchingTours && <em>is searching for tours</em>}
            {tours && has_more_tours && (
              <button
                className={styles.searchMoreBtn}
                onClick={searchToursNext}
              >
                Search more
              </button>
            )}
          </div>

          <div className="articles py-2">
            <h6>Articles {articles && <em>({total_articles} results)</em>}</h6>

            {articles && articles.length > 0 && (
              <ul className={styles.itemsList}>
                {articles.map((article) => (
                  <li key={article._id}>
                    <div className={styles.image}>
                      <img src={article.thumb} />
                    </div>
                    <div className={styles.textbox}>
                      <p>{article.title}</p>
                      <em>{article.lead.slice(0, 30)}...</em>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {articles && articles.length === 0 && (
              <em className="m-0">Not matches anything</em>
            )}

            {!articles && <em>Search for articles</em>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
