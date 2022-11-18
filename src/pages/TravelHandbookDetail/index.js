// main
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
// components
import Layout from "../../layout/Default";

// hooks
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./TravelHandbookDetail.module.css";

// mock
import { useEffect, useRef, useState } from "react";
import { postsApi } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import quillGetHTML from "../../services/helpers/quillGetHTML";
import ArticlePlaceholder from "../../components/placeholders/ArticlePlaceholder";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import { useTranslation } from "react-i18next";
import { brokenImage } from "../../assets/images";

function TravelHandbookDetail() {
  const { i18n } = useTranslation();
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendRequestPosts, isLoadingPost, datapost, errorpost] = useAxios();
  const quill = useRef();
  const { id } = useParams();
  console.log(data)
  useEffect(() => {
    sendRequest(postsApi.getSingleArticle(id));
    sendRequestPosts(postsApi.get({ page_size: 3 }));
  }, [i18n.language]);

  useEffect(() => {
    if (data) {
      quill.current.innerHTML = quillGetHTML(data.data.item.content);
    }
  }, [data]);

  usePageTitle(`${data?.data.item.title} || Cẩm nang du lịch || Go Travel`);

  const article = data ? data.data.item : null;

  return (
    <Layout sidebarRight banner>
      <div className={styles.container}>
        {article ? (
          <div className={styles.storyHeader}>
            <h1 className="mb-4 pb-1">{article.title}</h1>
            <p className={styles.date}>
              Posted on{" "}
              <span>{format(new Date(article.createdAt), "dd/MM/yyyy")}</span>{" "}
              by <Link to="/admin">{article.author}</Link>
            </p>
          </div>
        ) : null}

        <div className={styles.storyContent}>
          <div className={styles.quillContent} ref={quill}></div>
        </div>

        {isLoading && <ArticlePlaceholder />}

        <div className="mt-4">
          <h4 className={styles.relatedStoriesTitle}>Bài viết liên quan</h4>
          <div className="row">
            {datapost
              ? datapost.data.map((item) => (
                  <div key={item._id} className="col-12 col-sm-6 col-lg-4">
                    <div className={styles.relatedArticle}>
                      <Link to={`/cam-nang-du-lich/${item._id}`}>
                        <div className={styles.image}>
                          <img
                            src={item.thumb}
                            alt={item.title}
                            onError={(e) => (e.target.src = brokenImage)}
                          />
                        </div>

                        <div className={styles.textBox}>
                          <h4>{item.title}</h4>
                          <p>{item.lead.slice(0, 80)}...</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              : null}

            {isLoading &&
              new Array(3).fill(1).map((item, index) => (
                <li key={index} className="col-12 col-sm-6 col-lg-4">
                  <CardPlaceholder />
                </li>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TravelHandbookDetail;
