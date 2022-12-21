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

function ArticleForm({ onSubmit, initialValues, cat }) {
  const previewImageHandler = (img) =>
    typeof img === "string" ? img : URL.createObjectURL(img);

  const articlesCat = cat.filter((item) => item.type === "article");
  const lang = initialValues.language;
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

            {lang === "vi" && (
              <div className="d-flex justiy-content-start">
                <label className="d-flex align-items-center w-auto bg-white p-2 border rounded">
                  <h6 className="mb-0 text-nowrap me-2">Bài viết nổi bật</h6>
                  <input
                    className="w-auto m-0"
                    type="checkbox"
                    checked={values.hot}
                    onChange={() => setFieldValue("hot", !values.hot)}
                  />
                </label>
              </div>
            )}

            {lang === "vi" && (
              <div className={styles.layout}>
                <h6>Chọn làm banner</h6>
                <div className="d-flex">
                  <label className="d-flex align-items-center p-2 me-2 border rounded bg-white justify-content-start">
                    <p className="me-2 mb-0 text-nowrap">Guides</p>
                    <input
                      className="m-0"
                      type="checkbox"
                      value="guides"
                      checked={values.layout.includes("guides")}
                      onChange={(e) =>
                        setFieldValue(
                          "layout",
                          values.layout.includes(e.target.value)
                            ? values.layout.filter(
                                (item) => item !== e.target.value
                              )
                            : [...values.layout, e.target.value]
                        )
                      }
                    />
                  </label>

                  <label className="d-flex align-items-center p-2 me-2 border rounded bg-white justify-content-start">
                    <p className="me-2 mb-0 text-nowrap">Điểm đến</p>
                    <input
                      className="m-0"
                      type="checkbox"
                      value="diem-den"
                      checked={values.layout.includes("diem-den")}
                      onChange={(e) =>
                        setFieldValue(
                          "layout",
                          values.layout.includes(e.target.value)
                            ? values.layout.filter(
                                (item) => item !== e.target.value
                              )
                            : [...values.layout, e.target.value]
                        )
                      }
                    />
                  </label>

                  <label className="d-flex align-items-center p-2 me-2 border rounded bg-white justify-content-start">
                    <p className="me-2 mb-0 text-nowrap">Trải nghiệm</p>
                    <input
                      className="m-0"
                      type="checkbox"
                      value="trai-nghiem"
                      checked={values.layout.includes("trai-nghiem")}
                      onChange={(e) =>
                        setFieldValue(
                          "layout",
                          values.layout.includes(e.target.value)
                            ? values.layout.filter(
                                (item) => item !== e.target.value
                              )
                            : [...values.layout, e.target.value]
                        )
                      }
                    />
                  </label>

                  <label className="d-flex align-items-center p-2 me-2 border rounded bg-white justify-content-start">
                    <p className="me-2 mb-0 text-nowrap">Cẩm nang</p>
                    <input
                      className="m-0"
                      type="checkbox"
                      value="cam-nang"
                      checked={values.layout.includes("cam-nang")}
                      onChange={(e) =>
                        setFieldValue(
                          "layout",
                          values.layout.includes(e.target.value)
                            ? values.layout.filter(
                                (item) => item !== e.target.value
                              )
                            : [...values.layout, e.target.value]
                        )
                      }
                    />
                  </label>

                  <label className="d-flex align-items-center p-2 me-2 border rounded bg-white justify-content-start">
                    <p className="me-2 mb-0 text-nowrap">Nhật ký</p>
                    <input
                      className="m-0"
                      type="checkbox"
                      value="nhat-ky"
                      checked={values.layout.includes("nhat-ky")}
                      onChange={(e) =>
                        setFieldValue(
                          "layout",
                          values.layout.includes(e.target.value)
                            ? values.layout.filter(
                                (item) => item !== e.target.value
                              )
                            : [...values.layout, e.target.value]
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            )}

            {lang === "vi" && (
              <label>
                <h6>Tác giả</h6>
                <Field type="text" name="author" />
                <div className={styles.errorMsg}>
                  <ErrorMessage name="author" component="p" />
                </div>
              </label>
            )}

            {lang === "vi" && (
              <label>
                <h6>Nguồn bài viết</h6>
                <Field type="text" name="origin" />
              </label>
            )}

            <label>
              <h6>
                Đoạn mở đầu{" "}
                <em>(đoạn văn đầu tiên hoặc một đoạn mô tả ngắn)</em>
              </h6>
              <Field component="textarea" name="lead" className="w-100 p-2" />
              <div className={styles.errorMsg}>
                <ErrorMessage name="lead" component="p" />
              </div>
            </label>

            <div className={styles.label}>
              <h6>Nội dung</h6>
              <div className={styles.quillEditor}>
                <Editor
                  placeholder="Nội dung"
                  onChange={(delta) => setFieldValue("content", delta)}
                  initialValue={values.content}
                  onBlur={() => setFieldTouched("content", true, true)}
                />
              </div>
              <div className={styles.errorMsg}>
                <ErrorMessage name="content" component="p" />
              </div>
            </div>

            {/* ----------------------- categories ------------------------  */}

            {lang == "vi" && (
              <div className={styles.cat}>
                <h6>Categories</h6>

                <div className={styles.catItems}>
                  {articlesCat.map((catItem) => (
                    <label key={catItem._id}>
                      <span>{catItem.name || catItem.code}</span>
                      <input
                        type="checkbox"
                        value={catItem.code}
                        checked={values.category.includes(catItem.code)}
                        onChange={() => {
                          const newCat = values.category.includes(catItem.code)
                            ? values.category.filter(
                                (item) => item !== catItem.code
                              )
                            : [...values.category, catItem.code];

                          setFieldValue("category", newCat);
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {lang === "vi" && (
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
            )}

            {lang === "vi" && (
              <label className={styles.previewImage}>
                <h6>Hình banner</h6>
                <input
                  type="file"
                  onChange={(e) => setFieldValue("banner", e.target.files[0])}
                />
                <div className={styles.errorMsg}>
                  <ErrorMessage name="banner" component="p" />
                </div>

                {values.banner && (
                  <label className={styles.currentThumb}>
                    <img src={previewImageHandler(values.banner)} />
                  </label>
                )}
              </label>
            )}

            <button className={styles.submitBtn} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ArticleForm;
