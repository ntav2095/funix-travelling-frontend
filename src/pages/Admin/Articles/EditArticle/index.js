import { useEffect, useRef, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import { articleApis } from "../../../../services/apis/admin.apis";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../ArticleForm";
import styles from "./EditArticle.module.css";
import usePageTitle from "../../../../hooks/usePageTitle";
import ErrorMessage from "../../../../components/ErrorMessage";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";
import SpinnerModal from "../../../../components/SpinnerModal";

function EditPost() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchArticle, fetching, fetchedData, fetchingError] = useAxios();
  const [lang, setLang] = useState("vi");
  const [article, setArticle] = useState(null);
  const submitRef = useRef();

  const { articleId } = useParams();

  const langs = fetchedData
    ? fetchedData.metadata.categories
        .filter((item) => item.type === "language")
        .map((item) => item.code)
    : null;

  const submitHandler = async (values) => {
    const {
      title,
      author,
      origin,
      lead,
      thumb,
      content,
      language,
      category,
      hot,
      banner,
      layout,
    } = values;

    const formData = new FormData();
    formData.append("articleId", articleId);
    formData.append("language", language);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("origin", origin);
    formData.append("lead", lead);
    formData.append("hot", hot);
    formData.append("category", JSON.stringify(category));
    formData.append("content", JSON.stringify(content));
    formData.append("thumb", thumb);
    formData.append("banner", banner);
    formData.append("layout", JSON.stringify(layout));

    goEdit(articleApis.edit(formData));
  };

  useEffect(() => {
    fetchArticle(articleApis.getSingle(articleId, lang));
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

  useEffect(() => {
    if (editingError) {
      alert("That bai");
    }
  }, [editingError]);

  const initialValues = article
    ? {
        title: article.title,
        author: article.author,
        origin: article.origin,
        lead: article.lead,
        thumb: article.thumb,
        banner: article.banner,
        content: article.content,
        hot: article.hot,
        layout: article.layout,
        language: lang,
        category: article.category || [],
      }
    : null;

  usePageTitle("S???a b??i vi???t | Go Travel");

  return (
    <>
      <SpinnerModal show={editing} />

      <AdminLayout title={`C???p nh???t b??i vi???t ID: ${articleId}`}>
        <StatusBar title="C???p nh???t b??i vi???t">
          <button
            onClick={() => {
              if (submitRef.current) {
                submitRef.current.click();
              }
            }}
            className="btn btn-primary"
          >
            C???p nh???t
          </button>
        </StatusBar>

        <div className={styles.editPost}>
          {langs && (
            <label className="d-flex align-items-center mb-4">
              <h6 className="mb-0 me-2">Ng??n ng???</h6>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                {langs.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!initialValues && fetchedData && (
            <div>
              <h6>Hi???n ch??a c?? version ng??n ng??? "{lang}" c???a b??i vi???t n??y</h6>
              <button
                className={styles.addLangBtn}
                onClick={() => setArticle(fetchedData.metadata.original)}
              >
                Th??m version ti???ng "{lang}"
              </button>
            </div>
          )}

          {initialValues && !fetching && (
            <div className={styles.container}>
              <ArticleForm
                ref={submitRef}
                initialValues={initialValues}
                onSubmit={submitHandler}
                cat={fetchedData.metadata.categories}
              />
            </div>
          )}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default EditPost;
