// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tabs, Tab } from "react-bootstrap";

// components
import VisaFormGroup from "./VisaFormGroup";

import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// css
import styles from "./VisaForm.module.css";
import { useEffect } from "react";

const isEmptyDelta = (delta) => {
  const ops = delta.ops;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const validator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }

  return errors;
};

const templateValues = {
  language: "vi",

  name: "",
  country: "",
  price: "",

  priceIncludes: null,
  priceExcludes: null,
  priceOther: null,

  cancellationPolicy: null,
  registrationPolicy: null,
  paymentPolicy: null,
  notes: null,

  detail: null,
};

function VisaForm({ visaProduct, onSubmit }) {
  const [fetchCat, isFetchingCat, cat, fetchingCatError] = useAxios();

  const submitHandler = (values) => {
    onSubmit(values);
  };

  const initialValues = visaProduct || templateValues;

  const fieldMessage = (msg) => <p className={styles.fieldMessage}>{msg}</p>;

  useEffect(() => {
    fetchCat(adminApis.category.get());
  }, []);

  const countries = cat
    ? cat.data.filter((item) => item.type === "country")
    : [];

  return (
    <div className={styles.visaForm}>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, setFieldTouched, values }) => (
          <Form>
            <Tabs defaultActiveKey="generalInfo" className="bg-light">
              <Tab
                eventKey="generalInfo"
                title="Thông tin chung"
                className="p-2 bg-light"
              >
                <div className={styles.formGroup}>
                  <p className={styles.label}>Tên sản phẩm visa</p>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name">{fieldMessage}</ErrorMessage>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.label}>Tên nước</p>
                  <Field type="text" name="country" />
                  <ErrorMessage name="country">{fieldMessage}</ErrorMessage>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.label}>Giá sản phẩm</p>
                  <Field type="number" name="price" />
                  <ErrorMessage name="price">{fieldMessage}</ErrorMessage>
                </div>

                <div className="d-flex">
                  {countries.map((item) => (
                    <label className="d-flex align-items-center me-2 border p-2 bg-white rounded">
                      <p className="mb-0 me-2 text-nowrap">{item.name}</p>
                      <input type="checkbox" value={item.code} />
                    </label>
                  ))}
                </div>

                <div className="bg-white">
                  <VisaFormGroup
                    type="editor"
                    label="Chi tiết phiếu dịch vụ"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="detail"
                  />
                </div>
              </Tab>

              <Tab eventKey="terms" title="Điều khoản" className="p-2 bg-light">
                <VisaFormGroup
                  type="editor"
                  label="Điều kiện đăng ký"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="registrationPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Phương thức thanh toán"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="paymentPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Chính sách hoàn hủy đổi"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="cancellationPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Lưu ý"
                  setFieldValue={setFieldValue}
                  values={values}
                  name="notes"
                />
              </Tab>

              <Tab eventKey="price" title="Bảng giá" className="p-2 bg-light">
                <VisaFormGroup
                  label="Giá bao gồm"
                  name="priceIncludes"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />

                <VisaFormGroup
                  label="Giá không bao gồm"
                  name="priceExcludes"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />

                <VisaFormGroup
                  label="Giá trẻ em và phụ thu"
                  name="priceOther"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Tab>
            </Tabs>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VisaForm;
