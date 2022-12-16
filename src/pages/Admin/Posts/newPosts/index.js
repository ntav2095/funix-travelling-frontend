import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import styles from "./newPost.module.css";
import { adminApis } from "../../../../services/apis";
import SpinnerModal from "../../../../components/SpinnerModal";
import ArticleForm from "../ArticleForm";
import usePageTitle from "../../../../hooks/usePageTitle";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";

const initialValues = {
  title: "",
  author: "",
  origin: "",
  lead: "",
  content: null,
  thumb: null,
  category: [],
  hot: false,
  banner: false,
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
    formData.append("banner", values.banner);
    formData.append("lead", values.lead);
    formData.append("content", JSON.stringify(values.content));
    formData.append("image", values.thumb);
    formData.append("category", JSON.stringify(values.category));

    await sendRequest(adminApis.article.add(formData));
  };

  useEffect(() => {
    fetchCat(adminApis.category.get());
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
