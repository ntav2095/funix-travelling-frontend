import { Formik, Form, ErrorMessage } from "formik";
import { useMemo, forwardRef } from "react";

import tourValidator from "./tour.validator";
import FormGroup from "./FormGroup";
import CatGroup from "./CatGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// css
import styles from "./TourForm.module.css";
import "./TourForm.override.css";

function TourForm({ initialValues, onSubmit, cat }, ref) {
  console.log('ref',ref)
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={tourValidator}
    >
      {({ setFieldValue, setFieldTouched, values, touched, errors }) => {
        const categoryErr = touched.category && errors.category;
        const overviewErr = [];
        if (errors.code && touched.code) {
          overviewErr.push("code");
        }
        if (errors.name && touched.name) {
          overviewErr.push("name");
        }
        if (errors.days && touched.days) {
          overviewErr.push("days");
        }
        if (errors.nights && touched.nights) {
          overviewErr.push("nights");
        }
        if (errors.journey && touched.journey) {
          overviewErr.push("journey");
        }
        if (errors.countries && touched.countries) {
          overviewErr.push("countries");
        }
        if (errors.description && touched.description) {
          overviewErr.push("description");
        }
        if (errors.highlights && touched.highlights) {
          overviewErr.push("highlights");
        }
        if (errors.departureDates && touched.departureDates) {
          overviewErr.push("departureDates");
        }
        if (errors.price && touched.price) {
          overviewErr.push("price");
        }
        if (errors.thumb && touched.thumb) {
          overviewErr.push("thumb");
        }
        if (errors.banner && touched.banner) {
          overviewErr.push("banner");
        }
        return (
          <Form>
            <div className="tourForm pb-5">
              <Tabs defaultActiveKey="overview" className=" mb-0 border-0 ">
                <Tab
                  eventKey="overview"
                  title={
                    <div>
                      Tổng quan{" "}
                      {overviewErr.length > 0 && (
                        <span
                          title={overviewErr.join(", ")}
                          className="text-danger"
                        >
                          x
                        </span>
                      )}
                    </div>
                  }
                >
                  <div className=" rounded-0">
                    <div className="row">
                      {!not_vi && (
                        <div className="col-12 col-sm-4">
                          <FormGroup
                            label="Mã tour"
                            isRequired
                            component="input"
                            name="code"
                          />
                        </div>
                      )}

                      <div className={!not_vi ? "col-12 col-sm-8" : "col-12"}>
                        <FormGroup
                          label="Tên tour"
                          isRequired
                          component="input"
                          name="name"
                        />
                      </div>
                    </div>

                    {!not_vi && (
                      <FormGroup
                        type="hot"
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        name="hot"
                        values={values}
                      />
                    )}

                    <FormGroup
                      label="Lộ trình"
                      isRequired
                      component="textarea"
                      name="journey"
                    />

                    <FormGroup
                      label="Nước"
                      component="input"
                      isRequired
                      name="countries"
                    />

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
                        values={values}
                        setFieldValue={setFieldValue}
                        name="departureDates"
                        type="departureDates"
                      />
                    )}

                    {!not_vi && (
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <FormGroup
                            label="Số ngày"
                            isRequired
                            type="Number"
                            name="days"
                          />
                        </div>

                        <div className="col-12 col-md-6">
                          <FormGroup
                            label="Số đêm"
                            isRequired
                            type="Number"
                            name="nights"
                          />
                        </div>
                      </div>
                    )}

                    {!not_vi && (
                      <FormGroup
                        label="Giá"
                        note="(vnd)"
                        isRequired
                        type="locale-number"
                        name="price"
                        setFieldValue={setFieldValue}
                        values={values}
                      />
                    )}

                    {!not_vi && (
                      <>
                        <div>
                          <FormGroup
                            label="Chọn ảnh preview"
                            // isRequired
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
                        </div>

                        <div className="mt-4">
                          <FormGroup
                            label="Chọn ảnh banner"
                            // isRequired
                            name="banner"
                            type="file"
                            setFieldValue={setFieldValue}
                          />

                          {values.banner && (
                            <div className={styles.currentImages}>
                              <h6>Hình banner</h6>
                              <div className={styles.preview}>
                                <label>
                                  <img
                                    src={
                                      typeof values.banner === "string"
                                        ? values.banner
                                        : URL.createObjectURL(values.banner)
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Tab>

                {/* ----------------------- price policies ------------------------  */}
                <Tab eventKey="price" title="Bảng giá">
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
                </Tab>
                {/* ----------------------- terms ------------------------  */}
                <Tab eventKey="terms" title="Điều khoản">
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
                </Tab>

                {/* ----------------------- categories ------------------------  */}
                {!not_vi && (
                  <Tab
                    eventKey="category"
                    title={
                      <div>
                        Danh mục{" "}
                        {categoryErr && <span className="text-danger">x</span>}
                      </div>
                    }
                  >
                    <ErrorMessage
                      name="category"
                      className="text-danger"
                      component="p"
                    />
                    <CatGroup
                      cat={cat_continent}
                      type="Continent"
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                    />

                    <CatGroup
                      cat={cat_country}
                      type="Country"
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                    />

                    <CatGroup
                      cat={cat_city}
                      type="City"
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                    />
                  </Tab>
                )}

                {/* ----------------------- layout ------------------------  */}

                {!not_vi && (
                  <Tab eventKey="layout" title="Layout">
                    <FormGroup
                      label="Chọn làm banner"
                      name="layout"
                      type="layout"
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Tab>
                )}
              </Tabs>
            </div>

            <button type="submit" ref={ref} hidden></button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default forwardRef(TourForm);
