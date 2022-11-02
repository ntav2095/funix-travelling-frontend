import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./SignupConsultModal.module.css";

function SignupConsultModal({ handleClose, show }) {
  const initialValues = {
    fullname: "",
    email: "",
    phoneNumber: "",
  };

  const validator = (values) => {
    const errors = {};
    if (!values.fullname) {
      errors.fullname = "Họ và tên không được để trống.";
    }

    if (!values.email) {
      errors.email = "Email không được để trống.";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Số điện thoại không được để trống.";
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
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p className={styles.header}>
            Vui lòng cung cấp một số thông tin cần thiết hoặc gọi{" "}
            <span>094 518 5959/090 176 2929</span> để được tư vấn VISA nhanh
            nhất
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.form}>
                <label>
                  <p className={styles.label}>Họ Và tên</p>
                  <Field type="text" name="fullname" />
                  <ErrorMessage name="fullname" component="p" />
                </label>
                <label>
                  <p className={styles.label}>Họ Và tên</p>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="p" />
                </label>
                <label>
                  <p className={styles.label}>Số điện thoại</p>
                  <Field type="text" name="phoneNumber" />
                  <ErrorMessage name="phoneNumber" component="p" />
                </label>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning">ĐĂNG KÝ</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupConsultModal;
