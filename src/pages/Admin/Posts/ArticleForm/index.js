import { Formik, Form, Field, ErrorMessage } from "formik";
import Editor from "../../../../containers/Editor";

import styles from "./ArticleForm.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Bắt buộc";
  }

  if (!values.author) {
    errors.author = "Bắt buộc";
  }

  if (!values.lead) {
    errors.lead = "Bắt buộc";
  }

  if (
    !values.content ||
    (values.content?.ops.length === 1 &&
      !values.content.ops[0].insert.replace("\n", "").trim())
  ) {
    errors.content = "Bắt buộc";
  }

  if (!values.thumb) {
    errors.thumb = "Bắt buộc";
  }
  return errors;
};

function ArticleForm({ onSubmit, initialValues }) {
  const previewImageHandler = (img) =>
    typeof img === "string" ? img : URL.createObjectURL(img);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validator}
      >
        {({ setFieldValue, values, setFieldTouched }) => (
          <Form>
            <label>
              <h6>Tiêu đề</h6>
              <Field type="text" name="title" />
              <div className={styles.errorMsg}>
                <ErrorMessage name="title" component="p" />
              </div>
            </label>
            <label>
              <h6>Tác giả</h6>
              <Field type="text" name="author" />
              <div className={styles.errorMsg}>
                <ErrorMessage name="author" component="p" />
              </div>
            </label>

            <label>
              <h6>Nguồn bài viết</h6>
              <Field type="text" name="origin" />
            </label>

            <label>
              <h6>Đoạn mở đầu</h6>
              <Field type="text" name="lead" />
              <div className={styles.errorMsg}>
                <ErrorMessage name="lead" component="p" />
              </div>
            </label>

            <label>
              <h6>Nội dung</h6>
              <Editor
                placeholder="Nội dung"
                onChange={(delta) => setFieldValue("content", delta)}
                initialValue={values.content}
                onBlur={() => setFieldTouched("content", true, true)}
              />
              <div className={styles.errorMsg}>
                <ErrorMessage name="content" component="p" />
              </div>
            </label>

            <label className={styles.previewImage}>
              <h6>Hình hiển thị trước </h6>
              <input
                type="file"
                onChange={(e) => setFieldValue("thumb", e.target.files[0])}
              />
              <div className={styles.errorMsg}>
                <ErrorMessage name="thumb" component="p" />
              </div>

              {values.thumb && (
                <label className={styles.currentThumb}>
                  <img src={previewImageHandler(values.thumb)} />
                </label>
              )}
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ArticleForm;
