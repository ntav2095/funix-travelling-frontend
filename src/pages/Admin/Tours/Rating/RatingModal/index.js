import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminApis, useEffect } from "../../import";
import useAxios from "../../../../../hooks/useAxios";
import NotifyModal from "../../../../../components/NotifyModal";
import styles from "./RatingModal.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Bắt buộc";
  }

  if (!values.stars) {
    errors.stars = "Bắt buộc";
  }

  if (!values.content) {
    errors.content = "Bắt buộc";
  }

  return errors;
};

function RatingModal({ tour, ratingId, mode, fetchTour, ...props }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [isSuccess, setIsSuccess] = useState(false);

  let initialValues = {
    name: "",
    stars: "",
    content: "",
  };

  if (mode === "edit") {
    const ratingItem = tour.rating.find((item) => item._id === ratingId);
    initialValues = {
      name: ratingItem.name,
      stars: ratingItem.stars,
      content: ratingItem.content,
    };
  }

  const submitHandler = (values) => {
    if (mode === "edit") {
      sendRequest(
        adminApis.tour.editRatingItem({
          ratingId,
          tourId: tour._id,
          ...values,
        })
      );
    } else {
      sendRequest(
        adminApis.tour.rate({
          tourId: tour._id,
          ...values,
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      setIsSuccess(true);
      props.onHide();
      fetchTour();
    }
  }, [data]);

  return (
    <>
      <NotifyModal
        show={isSuccess && !props.show}
        onHide={() => setIsSuccess(false)}
        time={2000}
        type="success"
        message="Thanh cong"
      />

      <Modal
        contentClassName={styles.container}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {isLoading && (
          <div className={styles.spinner}>
            <div className="spinner-border text-dark" role="status" />
          </div>
        )}

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm đánh giá tour - {tour.code}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validate={validator}
          >
            {() => (
              <Form>
                <label className="d-block mb-4">
                  <h5 className="fs-6 mb-1">Tên</h5>
                  <Field type="text" name="name" className="w-100 p-1" />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-danger"
                  />
                </label>

                <label className="d-block mb-4">
                  <h5 className="fs-6 mb-1">Số sao</h5>
                  <Field type="number" name="stars" className="w-100 p-1" />
                  <ErrorMessage
                    name="stars"
                    component="p"
                    className="text-danger"
                  />
                </label>

                <label className="d-block mb-4">
                  <h5 className="fs-6 mb-1">Bình luận</h5>
                  <Field type="text" name="content" className="w-100 p-1" />
                  <ErrorMessage
                    name="content"
                    component="p"
                    className="text-danger"
                  />
                </label>

                {error && <p className="text-danger">{error.message}</p>}

                <button className="btn btn-primary" type="submit">
                  Đánh giá
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RatingModal;
