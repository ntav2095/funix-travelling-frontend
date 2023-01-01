import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import styles from "./NewArticle.module.css";
import SpinnerModal from "../../../../components/SpinnerModal";
import ArticleForm from "../ArticleForm";
import usePageTitle from "../../../../hooks/usePageTitle";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";
import {
  articleApis,
  categoryApis,
} from "../../../../services/apis/admin.apis";

const initialValues = {
  language: "vi",
  title: "",
  author: "",
  origin: "",
  lead: "",
  content: null,
  thumb: null,
  category: [],
  hot: false,
  banner: null,
  layout: [],
};

function NewPosts() {
  const [formKey, setFormKey] = useState(1);
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();

  const submitHandler = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("origin", values.origin);
    formData.append("lead", values.lead);
    formData.append("content", JSON.stringify(values.content));
    formData.append("thumb", values.thumb);
    formData.append("banner", values.banner);
    formData.append("layout", JSON.stringify(values.layout));
    formData.append("category", JSON.stringify(values.category));

    await sendRequest(articleApis.add(formData));
  };

  useEffect(() => {
    fetchCat(categoryApis.get());
  }, []);

  useEffect(() => {
    if (data) {
      alert("Thành công");
      setFormKey((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(`Thất bại: ${error.message}`);
    }
  }, [error]);

  usePageTitle("Tạo bài viết mới | Admin | Travel Funix");

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout title="Tạo bài viết mới">
        <StatusBar title="Tạo bài viết mới"></StatusBar>

        <div className={styles.container}>
          {cat && (
            <ArticleForm
              key={formKey}
              initialValues={initialValues}
              onSubmit={submitHandler}
              cat={cat.data}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default NewPosts;
