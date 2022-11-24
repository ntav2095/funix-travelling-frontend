import { Formik, Form, Field, ErrorMessage } from "formik";
import { tourValidator } from "../../../../services/validators";
import { exclamation as exclamationSVG } from "../../../../assets/svgs";
import styles from "./TourForm.module.css";
import FormGroup from "./FormGroup";
import CatGroup from "./CatGroup";

function TourForm({ initialValues, onSubmit, cat, type }) {
  // useMemo chỗ này
  let cat_continent = [];
  let cat_country = [];
  let cat_city = [];

  cat.forEach((item) => {
    if (item.type === "continent") {
      cat_continent.push(item);
    }

    if (item.type === "country") {
      cat_country.push(item);
    }

    if (item.type === "city") {
      cat_city.push(item);
    }
  });

  const isEdit = initialValues.language !== "vi";

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={tourValidator}
      >
        {({ setFieldValue, setFieldTouched, values }) => (
          <Form>
            <h5 className="text-center border-bottom pb-2">Tổng quan</h5>

            {!isEdit && (
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
              isRequired
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              name="highlights"
              values={values}
            />

            {!isEdit && (
              <FormGroup
                label="Ngày khởi hành"
                note="(dd/mm/yyyy) (enter xuống dòng)"
                isRequired
                component="textarea"
                name="departureDates"
              />
            )}

            {!isEdit && (
              <FormGroup label="Số ngày" isRequired type="Number" name="days" />
            )}
            {!isEdit && (
              <FormGroup
                label="Số đêm"
                isRequired
                type="Number"
                name="nights"
              />
            )}

            {!isEdit && (
              <FormGroup
                label="Giá"
                note="(vnd)"
                isRequired
                type="Number"
                name="price"
              />
            )}

            {/* ----------------------- price policies ------------------------  */}
            <h5 className="text-center border-bottom pb-2">Bảng giá</h5>

            <FormGroup
              label="Giá bao gồm"
              isRequired
              name="priceIncludes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Giá không bao gồm"
              isRequired
              name="priceExcludes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Giá trẻ em và phụ thu"
              isRequired
              name="priceOther"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            {/* ----------------------- terms ------------------------  */}
            <h5 className="text-center border-bottom pb-2">
              Điều khoản và chính sách
            </h5>

            <FormGroup
              label="Điều kiện đăng ký"
              isRequired
              name="registrationPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Điều kiện hoàn hủy"
              isRequired
              name="cancellationPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Phương thức thanh toán"
              isRequired
              name="paymentPolicy"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            <FormGroup
              label="Lưu ý"
              isRequired
              name="notes"
              type="editor"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              values={values}
            />

            {!isEdit && (
              <>
                <h5 className="text-center border-bottom  pb-2">Ảnh preview</h5>

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
            {!isEdit && (
              <>
                <h5 className="text-center border-bottom pb-2">
                  Phân loại danh mục
                </h5>

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
