import { hotTours } from "../../mock/sidebar.mock";
import ContactTable from "../ContactTable";
import ProductItem from "../../components/ProductItem";
import Placeholder from "../../components/placeholders/Placeholder";

import useAxios from "../../hooks/useAxios";
import { tourApi, postsApi } from "../../services/apis";
import { useEffect } from "react";
import styles from "./Sidebar.module.css";

function Sidebar({ primary }) {
  const [fetchTours, isFetchingTours, toursData, toursError] = useAxios();
  const [fetchArtilces, isFetchingArticles, articlesData, artilcesError] =
    useAxios();

  const tours = toursData ? toursData.items : null;
  const articles = articlesData ? articlesData.items : null;

  useEffect(() => {
    fetchTours(tourApi.get({ trending: true }));
    fetchArtilces(postsApi.get({ trending: true }));
  }, []);

  const getArticleImage = (articleContent) => {
    let imageSrc = "";
    for (const item of articleContent) {
      if (item.insert?.image) {
        imageSrc = item.insert.image;
        return imageSrc;
      }
    }
  };

  if (articles && articles.length > 0) {
    getArticleImage(articles[0].content);
  }

  return (
    <div className={styles.sidebar}>
      <ContactTable primary={primary} />

      <aside className={styles.tours}>
        <h2>TOUR HOT</h2>

        <ul>
          {tours &&
            tours.map((tour) => (
              <li key={tour._id}>
                <ProductItem
                  to={`/danh-sach-tour/${tour._id}`}
                  image={tour.images[0]}
                  text={tour.name.slice(0, 40) + "..."}
                  curPrice={tour.price.from}
                />
              </li>
            ))}

          {isFetchingTours &&
            new Array(5).fill(1).map((item, index) => (
              <li key={index}>
                <div className="d-flex pt-2 pb-1">
                  <div className="">
                    <Placeholder width="60px" height="60px" rounded />
                  </div>
                  <div className="ms-2 row w-100 p-2">
                    <Placeholder col="12" height="15px" rounded />
                    <Placeholder col="8" height="15px" rounded />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </aside>

      <aside className={styles.stories}>
        <h2>BÀI VIẾT MỚI</h2>

        <ul>
          {!isFetchingArticles &&
            articles &&
            articles.map((item, index) => (
              <li key={index}>
                <ProductItem
                  to={`/cam-nang-du-lich/${item.id}`}
                  image={getArticleImage(item.content)}
                  text={item.title}
                />
              </li>
            ))}

          {isFetchingArticles &&
            new Array(5).fill(1).map((item, index) => (
              <li key={index}>
                <div className="d-flex pt-2 pb-1">
                  <div className="">
                    <Placeholder width="60px" height="60px" rounded />
                  </div>
                  <div className="ms-2 row w-100 p-2">
                    <Placeholder col="12" height="15px" rounded />
                    <Placeholder col="8" height="15px" rounded />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
