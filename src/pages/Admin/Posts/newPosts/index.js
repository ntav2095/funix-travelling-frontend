import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../../../hooks/useAxios";
import AdminLayout from "../../../../layout/AdminLayout";
import styles from "./newPost.module.css";
import { adminApis } from "../../../../services/apis";
import Editor from "../../../../containers/Editor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SpinnerModal from "../../../../components/SpinnerModal";
import ArticleForm from "../ArticleForm";

const initialValues = {
  title: "",
  author: "",
  origin: "",
  lead: "",
  content: null,
  thumb: null,
  category: [],
};

function NewPosts() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();

  const submitHandler = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("origin", values.origin);
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
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert("Thất bại");
    }
  }, [error]);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout title="Tạo bài viết mới">
        <div className={styles.container}>
          {cat && (
            <ArticleForm
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
