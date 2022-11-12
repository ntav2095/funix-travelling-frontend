import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";

// components
import Stars from "../Stars";

// assets
import { camera as cameraSVG } from "../../../../../assets/svgs";

// css
import styles from "./ReviewModal.module.css";

const validator = (values) => {
  let errors = {};
  if (!values.fullname) {
    errors.fullname = "Bạn chưa điền tên";
  }

  if (!values.phone) {
    errors.phone = "Bạn chưa điền số điện thoại";
  }

  if (!values.content) {
    errors.content = "Mời bạn chia sẻ một số cảm nhận";
  }

  return errors;
};

const initialValues = {
  content: "",
  fullname: "",
  phone: "",
  images: [],
};

function ReviewModal({ tour, show, onHide }) {
  const submitHandler = (values) => {
    //
  };
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Đánh giá
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.modalImage}>
              <img src={tour.images[0]} alt={tour.name} />
            </div>

            <h3 className={styles.modalTourName}>{tour.name}</h3>
            <div className={styles.modalStars}>
              <Stars stars={5} />
            </div>

            <div className={styles.textField}>
              <Field
                component="textarea"
                name="content"
                placeholder="Mời bạn chia sẻ một số cảm nhận về sản phẩm..."
              />
              <ErrorMessage name="content" component="p" />
            </div>

            <div className={styles.fileInput}>
              <label className={styles.filePlaceholder}>
                {cameraSVG} <span>Gửi hình chụp thực tế</span>{" "}
                <span>{`(tối đa 3 hình)`}</span>
                <input type="file" />
              </label>
            </div>

            <div className="row ">
              <div className="col-12 col-sm-6">
                <div className={styles.textField}>
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Họ tên (bắt buộc)"
                  />
                  <ErrorMessage name="fullname" component="p" />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className={styles.textField}>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại (bắt buộc)"
                  />
                  <ErrorMessage name="phone" component="p" />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="text-center">
            <button className={styles.modalBtn}>Gửi đánh giá ngay</button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default ReviewModal;
