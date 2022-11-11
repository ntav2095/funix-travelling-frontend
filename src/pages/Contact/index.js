import { Formik, Form, Field, ErrorMessage } from "formik";
import Layout from "../../layout/Default";
import companyInfo from "../../services/constants/companyInfo.constant";
import usePageTitle from "../../hooks/usePageTitle";
import styles from "./Contact.module.css";

const breadcrumb = [
  { href: "/", active: false, text: "trang chủ" },
  { href: "/lien-he", active: true, text: "giới thiệu" },
  { href: "/lien-he", active: true, text: "thông tin liên hệ" },
];

function Contact() {
  usePageTitle("Liên hệ || Go Travel");

  const initialValues = {
    email: "",
    phone: "",
    address: "",
    fullname: "",
    note: "",
  };

  const validator = (values) => {
    const errors = {};
    if (!values.fullname) {
      errors.fullname = "Họ và tên không được bỏ trống";
    }
    if (!values.phone) {
      errors.phone = "Số điện thoại không được bỏ trống";
    }
    if (!values.email) {
      errors.email = "Email không được bỏ trống";
    }
    if (!values.address) {
      errors.address = "Địa chỉ không được bỏ trống";
    }
    if (!values.note) {
      errors.note = "Ghi chú không được bỏ trống";
    }

    return errors;
  };

  const submitHandler = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  return (
    <Layout sidebarLeft breadcrumb={breadcrumb}>
      <div className={styles.contact}>
        <div className={styles.companyInfo}>
          <h2>{companyInfo.title1}</h2>
          <h3>{companyInfo.title2}</h3>

          {companyInfo.info.map((item, index) => (
            <p key={index}>
              {item.icon}
              <span>{item.text}</span>
            </p>
          ))}
        </div>

        <div className="sendFeedback">
          <p>
            Để đóng góp ý kiến về chất lượng dịch vụ, cũng như có những yêu cầu,
            thắc mắc cần được giải đáp, xin vui lòng điền vào Form sau đây và
            gửi đến 365 Travel.
          </p>
          <p>
            Ngay sau khi nhận được thông tin, chúng tôi sẽ phản hồi với bạn
            trong thời gian sớm nhất.
          </p>
          <p> Xin chân thành cảm ơn!</p>

          <div className={styles.form}>
            <Formik
              initialValues={initialValues}
              validate={validator}
              onSubmit={submitHandler}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label>
                    <p className={styles.label}>Họ và tên</p>
                    <Field type="text" name="fullname" />
                    <ErrorMessage name="fullname" component="p" />
                  </label>

                  <label>
                    <p className={styles.label}>Điện thoại</p>
                    <Field type="tel" name="phone" />
                    <ErrorMessage name="phone" component="p" />
                  </label>

                  <label>
                    <p className={styles.label}>Email</p>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="p" />
                  </label>

                  <label>
                    <p className={styles.label}>Địa chỉ</p>
                    <Field type="tẽt" name="address" />
                    <ErrorMessage name="address" component="p" />
                  </label>

                  <label>
                    <p className={styles.label}>Ghi chú</p>
                    <Field component="textarea" name="note" />
                    <ErrorMessage name="note" component="p" />
                  </label>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
