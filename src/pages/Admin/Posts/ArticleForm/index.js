import { Formik, Form, Field, ErrorMessage } from "formik";
import Editor from "../../../../containers/Editor";

import styles from "./ArticleForm.module.css";

function ArticleForm({ onSubmit, initialValues }) {
  const previewImageHandler = (img) =>
    typeof img === "string" ? img : URL.createObjectURL(img);
  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <label>
              <h6>Tiêu đề</h6>
              <Field type="text" name="title" />
            </label>
            <label>
              <h6>Tác giả</h6>
              <Field type="text" name="author" />
            </label>

            <label>
              <h6>Nguồn bài viết</h6>
              <Field type="text" name="origin" />
            </label>

            <label>
              <h6>Đoạn mở đầu</h6>
              <Field type="text" name="lead" />
            </label>

            <label>
              <h6>Nội dung</h6>
              <Editor
                placeholder="Nội dung"
                onChange={(delta) => setFieldValue("content", delta)}
                initialValue={values.content}
              />
            </label>

            <div className={styles.previewImage}>
              <h6>
                Hình hiển thị trước{" "}
                <em>(hình này sẽ là như nhau ở mọi language versions)</em>
              </h6>
              <input
                type="file"
                onChange={(e) => setFieldValue("thumb", e.target.files[0])}
              />
              {values.thumb && (
                <label className={styles.currentThumb}>
                  <img src={previewImageHandler(values.thumb)} />
                </label>
              )}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ArticleForm;
