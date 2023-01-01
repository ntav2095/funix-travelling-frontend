import { Formik, Form, Field, ErrorMessage } from "formik";
import { forwardRef } from "react";
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

  if (!values.banner) {
    errors.banner = "Bắt buộc";
  }

  if (values.category.length === 0) {
    errors.category = "Bắt buộc";
  }
  return errors;
};

function ArticleForm({ onSubmit, initialValues, cat }, ref) {
  const previewImageHandler = (img) =>
    typeof img === "string" ? img : URL.createObjectURL(img);

  const articlesCat = cat.filter((item) => item.type === "article");
  const language = initialValues.language;

  const isRequired = (
    <em className="text-italic fw-normal text-secondary">(bắt buộc)</em>
  );
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validator}
      >
        {({ setFieldValue, values, setFieldTouched, touched }) => (
          <Form>
            <label>
              <h6>Tiêu đề {isRequired}</h6>
              <Field type="text" name="title" />
              <ErrorMessage
                name="title"
                component="p"
                className="text-danger"
              />
            </label>

            {language === "vi" && (
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

            {/* ================== layout ===================  */}
            {language === "vi" && (
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

            {/* ================== tác giả ===================  */}
            {language === "vi" && (
              <label>
                <h6>Tác giả {isRequired}</h6>
                <Field type="text" name="author" />
                <ErrorMessage
                  name="author"
                  component="p"
                  className="text-danger"
                />
              </label>
            )}

            {language === "vi" && (
              <label>
                <h6>Nguồn bài viết</h6>
                <Field type="text" name="origin" />
              </label>
            )}

            <label>
              <h6>
                Đoạn mở đầu{" "}
                <em>(đoạn văn đầu tiên hoặc một đoạn mô tả ngắn)</em>{" "}
                {isRequired}
              </h6>
              <Field component="textarea" name="lead" className="w-100 p-2" />
              <ErrorMessage name="lead" component="p" className="text-danger" />
            </label>

            <div className={styles.label}>
              <h6>Nội dung {isRequired}</h6>
              <div className={styles.quillEditor}>
                <Editor
                  placeholder="Nội dung"
                  onChange={(delta) => setFieldValue("content", delta)}
                  initialValue={values.content}
                  onBlur={() => setFieldTouched("content", true, true)}
                />
              </div>
              <ErrorMessage
                name="content"
                component="p"
                className="text-danger"
              />
            </div>

            {/* ----------------------- categories ------------------------  */}

            {language == "vi" && (
              <div className={styles.cat}>
                <h6>Categories {isRequired}</h6>

                <div className={" d-flex gap-2 justify-content-start"}>
                  {articlesCat.map((catItem) => (
                    <label
                      key={catItem._id}
                      className="bg-white p-2 d-flex gap-2 rounded w-auto align-items-center border mb-0"
                    >
                      <span>{catItem.name || catItem.code}</span>
                      <input
                        className="w-auto"
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
                          if (!touched.category) {
                            setFieldTouched("category", true, false);
                          }
                        }}
                      />
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  className="text-danger my-0"
                  name="category"
                  component="p"
                />
              </div>
            )}

            {language === "vi" && (
              <label className={styles.previewImage}>
                <h6>
                  Hình hiển thị trước <em>(Hình nhỏ, tỷ lệ ngang/cao = 1.6)</em>{" "}
                  {isRequired}
                </h6>
                <input
                  type="file"
                  onChange={(e) => setFieldValue("thumb", e.target.files[0])}
                />
                <ErrorMessage
                  name="thumb"
                  component="p"
                  className="text-danger"
                />

                {values.thumb && (
                  <label className={styles.currentThumb}>
                    <img src={previewImageHandler(values.thumb)} />
                  </label>
                )}
              </label>
            )}

            {language === "vi" && (
              <label className={styles.previewImage}>
                <h6>
                  Hình banner <em>(Hình nhỏ, tỷ lệ ngang/cao = 2.5)</em>{" "}
                  {isRequired}
                </h6>
                <input
                  type="file"
                  onChange={(e) => setFieldValue("banner", e.target.files[0])}
                />
                <ErrorMessage
                  name="banner"
                  component="p"
                  className="text-danger"
                />

                {values.banner && (
                  <label className={styles.currentThumb}>
                    <img src={previewImageHandler(values.banner)} />
                  </label>
                )}
              </label>
            )}

            <button ref={ref} hidden type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default forwardRef(ArticleForm);
