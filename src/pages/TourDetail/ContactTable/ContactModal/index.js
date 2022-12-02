import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import styles from "./ContactModal.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const trans = {
  firstname: {
    en: "Firstname",
    vi: "Họ",
  },
  surname: {
    en: "Surname",
    vi: "Tên",
  },
  phone: {
    en: "Phone number",
    vi: "Số điện thoại",
  },
  requested_successfully: {
    en: "Requested successfully. We will contact you in 2 hours.",
    vi: "Yêu cầu gọi lại thành công. Chúng tôi sẽ liên hệ với bạn trong vòng 2 giờ.",
  },
  requested_failed: {
    en: "Something wrong happens. Please try again, hoặc yêu cầu gọi lại, or contact us: 123456789",
    vi: "Có lỗi xảy ra. Vui lòng thử lại, hoặc yêu cầu gọi lại, hoặc liên hệ với chúng tôi theo số: 123456789",
  },
  call_me: {
    en: "Call me",
    vi: "Yêu cầu gọi lại",
  },
};

const validator = (values) => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "required";
  }

  if (!values.surname) {
    errors.surname = "required";
  }

  if (!values.phone) {
    errors.phone = "required";
  }

  return errors;
};

const initialValues = {
  firstname: "",
  surname: "",
  phone: "",
};

function ContactModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const lang = useTranslation().i18n.language;

  const submitHandler = async (values) => {
    const request1 = axios.post("https://sheetdb.io/api/v1/31iln4h8j6ok8", {
      data: {
        firstname: values.firstname,
        surname: values.surname,
        phone: values.phone,
      },
    });

    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("surname", values.surname);
    formData.append("phone", values.phone);

    const request2 = axios.post("https://formspree.io/f/mgeqpdao", formData);

    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      await Promise.all([request1, request2]);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      // alert(trans.requested_failed[lang]);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      props.success(true)
      props.onHide();
    }
  }, [isSuccess]);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="fs-6">{trans.call_me[lang]}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.form}>
            {isLoading && (
              <div className={styles.spinner}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validate={validator}
              onSubmit={submitHandler}
            >
              {() => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.firstname[lang]}:</h6>
                        <Field type="text" name="firstname" required />
                        <ErrorMessage name="firstname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.surname[lang]}:</h6>
                        <Field type="text" name="surname" required />
                        <ErrorMessage name="surname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.phone[lang]}:</h6>
                        <Field type="tel" name="phone" required />
                        <ErrorMessage name="phone" component="p" />
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-dark btn-sm" type="submit">
                    {trans.call_me[lang]}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactModal;
