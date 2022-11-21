import { Formik, Form, Field, ErrorMessage } from "formik";
import { tourValidator } from "../../../../services/validators";
import { exclamation as exclamationSVG } from "../../../../assets/svgs";
import styles from "./TourForm.module.css";

function TourForm({ initialValues, onSubmit, cat }) {
  const requiredField = (
    <span title="Trường này là bắt buộc">{exclamationSVG}</span>
  );

  const checkHandler = (setFieldValue, values, src) => {
    if (values.removedImages.includes(src)) {
      setFieldValue(
        "removedImages",
        values.removedImages.filter((item) => item !== src)
      );
    } else {
      setFieldValue("removedImages", [...values.removedImages, src]);
    }
  };

  const cat_types = cat.reduce((p, c) => {
    if (p.includes(c.type) || c.type === "language" || c.type === "article") {
      return p;
    }

    return [...p, c.type];
  }, []);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={tourValidator}
      >
        {({ setFieldValue, values, handleReset }) => (
          <Form>
            {/* ----------------------- tên tour ------------------------  */}
            <label className={styles.smallTextArea}>
              <p className={styles.label}>Tên tour {requiredField}</p>
              <Field component="textarea" name="name" />
              <ErrorMessage name="name" component="h6" />
            </label>

            {/* ----------------------- lộ trình ------------------------  */}
            <label className={styles.mediumTextArea}>
              <p className={styles.label}>
                Lộ trình <em>(cách nhau bởi gạch ngang "-")</em> {requiredField}
              </p>
              <Field component="textarea" name="journey" />
              <ErrorMessage name="journey" component="h6" />
            </label>

            {/* ----------------------- countries ------------------------  */}
            <label className={styles.mediumTextArea}>
              <p className={styles.label}>
                Nước <em>(cách nhau bởi gạch ngang "-")</em>
              </p>
              <Field name="countries" />
              <ErrorMessage name="countries" component="h6" />
            </label>

            {/* ----------------------- mô tả ------------------------  */}
            <label className={styles.bigTextArea}>
              <p className={styles.label}>Mô tả {requiredField}</p>
              <Field component="textarea" name="description" />
              <ErrorMessage name="description" component="h6" />
            </label>

            {/* ----------------------- điểm nổi bật ------------------------  */}
            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Điểm nổi bật <em>(enter xuống dòng)</em> {requiredField}
              </p>
              <Field component="textarea" name="highlights" />
              <ErrorMessage name="highlights" component="h6" />
            </label>

            {/* ----------------------- ngày khởi hành ------------------------  */}
            <label className={styles.mediumTextArea}>
              <p className={styles.label}>
                Ngày khởi hành <em>(dd/mm/yyyy) (enter xuống dòng) </em>
                {requiredField}
              </p>
              <Field component="textarea" name="departureDates" />
              <ErrorMessage name="departureDates" component="h6" />
            </label>

            {/* ----------------------- thời gian ------------------------  */}
            <label>
              <p className={styles.label}>Số ngày {requiredField}</p>
              <Field type="Number" name="days" />
              <ErrorMessage name="days" component="h6" />
            </label>

            <label>
              <p className={styles.label}>Số đêm {requiredField}</p>
              <Field type="Number" name="nights" />
              <ErrorMessage name="nights" component="h6" />
            </label>

            {/* ----------------------- giá hiện tại ------------------------  */}
            <label>
              <p className={styles.label}>
                Giá hiện tại <em>(vnd)</em> {requiredField}
              </p>
              <Field type="number" name="currentPrice" />
              <ErrorMessage name="currentPrice" component="h6" />
            </label>

            {/* ----------------------- giá cũ ------------------------  */}
            <label>
              <p className={styles.label}>
                Giá cũ <span>(vnd)</span>
              </p>
              <Field type="number" name="oldPrice" />
              <ErrorMessage name="oldPrice" component="h6" />
            </label>

            {/* ----------------------- giá bao gồm / không bao gồm ------------------------  */}
            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Giá bao gồm <em>(enter xuống dòng)</em>
              </p>
              <Field component="textarea" name="priceIncludes" />
              <ErrorMessage name="priceIncludes" component="h6" />
            </label>

            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Giá không bao gồm <em>(enter xuống dòng)</em>
              </p>
              <Field component="textarea" name="priceExcludes" />
              <ErrorMessage name="priceExcludes" component="h6" />
            </label>

            {/* ----------------------- điều kiện hủy ------------------------  */}
            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Điều kiện hoàn hủy đổi <em>(enter xuống dòng)</em>{" "}
                {requiredField}
              </p>
              <Field component="textarea" name="cancellationPolicy" />
              <ErrorMessage name="cancellationPolicy" component="h6" />
            </label>

            {/* ----------------------- categories ------------------------  */}
            {cat_types.map((type) => (
              <div className={styles.cat} key={type}>
                <h6>{type}</h6>

                <div className={styles.catItems}>
                  {cat
                    .filter((catItem) => catItem.type === type)
                    .map((catItem) => (
                      <label key={catItem._id}>
                        <span>{catItem.name || catItem.code}</span>
                        <input
                          type="checkbox"
                          value={catItem.code}
                          checked={values.category.includes(catItem.code)}
                          onChange={() => {
                            const newCat = values.category.includes(
                              catItem.code
                            )
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
            ))}

            {/* ----------------------- hình ------------------------  */}
            <label>
              <p className={styles.label}>Chọn ảnh slider</p>
              <input
                type="file"
                name="slider"
                multiple
                onChange={(e) =>
                  setFieldValue("slider", Array.from(e.target.files))
                }
              />
              <ErrorMessage name="slider" component="h6" />
            </label>

            <label>
              <p className={styles.label}>Chọn ảnh preview</p>
              <input
                type="file"
                name="thumb"
                onChange={(e) =>
                  setFieldValue("thumb", Array.from(e.target.files)[0])
                }
              />
              <ErrorMessage name="thumb" component="h6" />
            </label>

            {initialValues?.thumb && (
              <div className={styles.currentImages}>
                <h3 className="text-center mb-2 mt-4">Hình hiện tại</h3>
                <h6>Hình slider</h6>
                <div className={styles.preview}>
                  {initialValues.slider.map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={values.removedImages.includes(item)}
                        onChange={() =>
                          checkHandler(setFieldValue, values, item)
                        }
                      />
                      <img src={item} />
                    </label>
                  ))}
                </div>

                <h6>Hình đại diện</h6>
                <div className={styles.preview}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() =>
                        checkHandler(setFieldValue, values, initialValues.thumb)
                      }
                    />
                    <img
                      src={initialValues.thumb}
                      checked={values.removedImages.includes(
                        initialValues.thumb
                      )}
                    />
                  </label>
                </div>
              </div>
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

export default TourForm;
