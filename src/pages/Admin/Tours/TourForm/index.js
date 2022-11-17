import { Formik, Form, Field, ErrorMessage } from "formik";
import { tourValidator } from "../../../../services/validators";
import { exclamation as exclamationSVG } from "../../../../assets/svgs";
import styles from "./TourForm.module.css";

function TourForm({ initialValues, onSubmit, cat }) {
  const requiredField = (
    <span title="Trường này là bắt buộc">{exclamationSVG}</span>
  );

  const checkHandler = (setFieldValue, values, src) => {
    console.log(values);
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
    if (p.includes(c.type) || c.type === "language") {
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
        {({ setFieldValue, values }) => (
          <Form>
            {/* ----------------------- tên tour ------------------------  */}
            <label className={styles.smallTextArea}>
              <p className={styles.label}>Tên tour {requiredField}</p>
              <Field component="textarea" name="name" />
              <ErrorMessage name="name" component="h6" />
            </label>

            {/* ----------------------- lộ trình ------------------------  */}
            <label className={styles.mediumTextArea}>
              <p className={styles.label}>Lộ trình {requiredField}</p>
              <Field component="textarea" name="journey" />
              <ErrorMessage name="journey" component="h6" />
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
                Điểm nổi bật <span>(enter xuống dòng)</span> {requiredField}
              </p>
              <Field component="textarea" name="highlights" />
              <ErrorMessage name="highlights" component="h6" />
            </label>

            {/* ----------------------- ngày khởi hành ------------------------  */}
            <label className={styles.mediumTextArea}>
              <p className={styles.label}>
                Ngày khởi hành <span>(dd/mm/yyyy)</span>{" "}
                <span>(enter xuống dòng)</span> {requiredField}
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
                Giá hiện tại <span>(vnd)</span> {requiredField}
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
                Giá bao gồm <span>(enter xuống dòng)</span>
              </p>
              <Field component="textarea" name="priceIncludes" />
              <ErrorMessage name="priceIncludes" component="h6" />
            </label>

            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Giá không bao gồm <span>(enter xuống dòng)</span>
              </p>
              <Field component="textarea" name="priceExcludes" />
              <ErrorMessage name="priceExcludes" component="h6" />
            </label>

            {/* ----------------------- điều kiện hủy ------------------------  */}
            <label className={styles.bigTextArea}>
              <p className={styles.label}>
                Điều kiện hoàn hủy đổi <span>(enter xuống dòng)</span>{" "}
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
                        <span>{catItem.code}</span>
                        <input
                          type="checkbox"
                          value={catItem._id}
                          checked={values.category.includes(catItem._id)}
                          onChange={() => {
                            const newCat = values.category.includes(catItem._id)
                              ? values.category.filter(
                                  (item) => item !== catItem._id
                                )
                              : [...values.category, catItem._id];

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
              <p className={styles.label}>Ảnh slider</p>
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
              <p className={styles.label}>Ảnh preview (1 hình)</p>
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
