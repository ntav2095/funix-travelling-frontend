import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import { adminApis } from "../../../../services/apis";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../../../containers/Editor";
import { Tab } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ArticleForm from "../ArticleForm";
import styles from "./editposts.module.css";

function EditPost() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchArticle, fetching, fetchedData, fetchingError] = useAxios();
  const [lang, setLang] = useState("vi");
  const [article, setArticle] = useState(null);

  const [data, setData] = useState(null);
  const { articleId } = useParams();

  const langs = fetchedData
    ? fetchedData.metadata.categories
        .find((item) => item.type === "language")
        .items.map((item) => item.code)
    : [];

  const submitHandler = async (values) => {
    const { title, author, origin, lead, thumb, content, language } = values;
    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("language", language);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("origin", origin);
    formData.append("lead", lead);
    formData.append("content", JSON.stringify(content));
    if (typeof thumb !== "string") {
      formData.append("image", thumb);
    }

    goEdit(adminApis.article.edit(formData));
  };

  useEffect(() => {
    fetchArticle(adminApis.article.getSingle(articleId, lang));
  }, [lang]);

  useEffect(() => {
    if (fetchedData) {
      setArticle(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (isSuccess) {
      alert("Thanh cong");
    }
  }, [isSuccess]);

  const initialValues = article
    ? {
        title: article.title,
        author: article.author,
        origin: article.origin,
        lead: article.lead,
        thumb: article.thumb,
        content: article.content,
        language: lang,
      }
    : null;

  return (
    <AdminLayout>
      <div className={styles.editPost}>
        <h1>Article ID: {articleId}</h1>

        <label className={styles.langSelect}>
          <span>Ngôn ngữ</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {langs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {initialValues && !fetching && (
          <div className={styles.container}>
            <ArticleForm
              initialValues={initialValues}
              onSubmit={submitHandler}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default EditPost;
