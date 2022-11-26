import { Formik, Form } from "formik";
import { tourValidator } from "../../../../services/validators";
import { useMemo } from "react";
import FormGroup from "./FormGroup";
import CatGroup from "./CatGroup";
import styles from "./TourForm.module.css";

function TourForm({ initialValues, onSubmit, cat }) {
  let cat_continent = useMemo(
    () => cat.filter((item) => item.type === "continent"),
    [cat]
  );

  let cat_country = useMemo(
    () => cat.filter((item) => item.type === "country"),
    [cat]
  );

  let cat_city = useMemo(
    () => cat.filter((item) => item.type === "city"),
    [cat]
  );

  const not_vi = initialValues.language !== "vi"; // không phải ngôn ngữ tiếng Việt thì ẩn 1 số fields

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={tourValidator}
      >
        {({ setFieldValue, setFieldTouched, values }) => (
          <Form>
            <h2 className={styles.title}>Tổng quan</h2>

            {!not_vi && (
              <FormGroup
                label="Mã tour"
                isRequired
                component="input"
                name="code"
              />
            )}

            <FormGroup
              label="Tên tour"
              isRequired
              component="input"
              name="name"
            />

            <FormGroup
              label="Lộ trình"
              isRequired
              component="textarea"
              name="journey"
            />

            <FormGroup label="Nước" component="input" name="countries" />

            <FormGroup
              label="Mô tả"
              isRequired
              component="textarea"
              name="description"
            />

            <FormGroup
              label="Điểm nổi bật"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              name="highlights"
              values={values}
            />

            {!not_vi && (
              <FormGroup
                label="Ngày khởi hành"
                note="(dd/mm/yyyy) (enter xuống dòng)"
                isRequired
                component="textarea"
                name="departureDates"
              />
            )}

            {!not_vi && (
              <FormGroup label="Số ngày" isRequired type="Number" name="days" />
            )}
            {!not_vi && (
              <FormGroup
                label="Số đêm"
                isRequired
                type="Number"
                name="nights"
              />
            )}

            {!not_vi && (
              <FormGroup
                label="Giá"
                note="(vnd)"
                isRequired
                type="Number"
                name="price"
              />
            )}

            {/* ----------------------- price policies ------------------------  */}
            <h2 className={styles.title}>Bảng giá</h2>

            <FormGroup
              label="Giá bao gồm"
              name="priceIncludes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Giá không bao gồm"
              name="priceExcludes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Giá trẻ em và phụ thu"
              name="priceOther"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            {/* ----------------------- terms ------------------------  */}
            <h2 className={styles.title}>Điều khoản và chính sách</h2>

            <FormGroup
              label="Điều kiện đăng ký"
              name="registrationPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Điều kiện hoàn hủy"
              name="cancellationPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Phương thức thanh toán"
              name="paymentPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Lưu ý"
              name="notes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            {!not_vi && (
              <>
                <h2 className={styles.title}>Ảnh preview</h2>

                <FormGroup
                  label="Chọn ảnh preview"
                  isRequired
                  name="thumb"
                  type="file"
                  setFieldValue={setFieldValue}
                />

                {values.thumb && (
                  <div className={styles.currentImages}>
                    <h6>Hình đại diện</h6>
                    <div className={styles.preview}>
                      <label>
                        <img
                          src={
                            typeof values.thumb === "string"
                              ? values.thumb
                              : URL.createObjectURL(values.thumb)
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ----------------------- categories ------------------------  */}
            {!not_vi && (
              <>
                <h2 className={styles.title}>Phân loại danh mục</h2>

                <CatGroup
                  cat={cat_continent}
                  type="Continent"
                  values={values}
                  setFieldValue={setFieldValue}
                />

                <CatGroup
                  cat={cat_country}
                  type="Country"
                  values={values}
                  setFieldValue={setFieldValue}
                />

                <CatGroup
                  cat={cat_city}
                  type="City"
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </>
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
