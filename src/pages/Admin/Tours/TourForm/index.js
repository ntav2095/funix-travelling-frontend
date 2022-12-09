import { Formik, Form } from "formik";
import { tourValidator } from "../../../../services/validators";
import { useMemo } from "react";
import FormGroup from "./FormGroup";
import CatGroup from "./CatGroup";
import styles from "./TourForm.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StatusBar from "../../../../layout/AdminLayout/StatusBar";
import "./TourForm.override.css";
import {
  isSameDate,
  stringToDate,
} from "../../../../services/helpers/dateHandler";
import { format } from "date-fns";

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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={tourValidator}
    >
      {({ setFieldValue, setFieldTouched, values }) => (
        <Form>
          <StatusBar
            title={
              initialValues.code
                ? `Cập nhật tour: ${initialValues.code}`
                : `Tạo tour mới`
            }
          >
            <button type="submit" className="btn btn-primary btn-sm">
              Xác nhận
            </button>
          </StatusBar>

          <div className="tourForm pb-5">
            <Tabs defaultActiveKey="overview" className=" mb-0 border-0 ">
              <Tab eventKey="overview" title="Tổng quan">
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

                  <FormGroup
                    label="Ngày khởi hành"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="departureDates"
                    type="departureDates"
                  />

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

              {!not_vi && (
                <Tab eventKey="thumb" title="Ảnh preview">
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
                </Tab>
              )}

              {/* ----------------------- categories ------------------------  */}
              {!not_vi && (
                <Tab eventKey="category" title="Danh mục">
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
                </Tab>
              )}
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TourForm;
