import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { tourApis } from "../../../../../services/apis/admin.apis";
import useAxios from "../../../../../hooks/useAxios";
import NotifyModal from "../../../../../components/NotifyModal";
import styles from "./RatingModal.module.css";
import { isInteger } from "lodash";

const validator = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Bắt buộc";
  }

  if (!values.content) {
    errors.content = "Bắt buộc";
  }

  return errors;
};

function RatingModal({ tour, ratingId, mode, fetchTour, ...props }) {
  const [sendRequest, isLoading, data, error, resetData] = useAxios();

  let initialValues = {
    name: "",
    stars: 5,
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
        tourApis.editRatingItem({
          ratingId,
          tourId: tour._id,
          ...values,
        })
      );
    } else {
      sendRequest(
        tourApis.rate({
          tourId: tour._id,
          ...values,
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      props.onHide();
    }
  }, [data]);

  let notify = {};
  if (data) {
    notify = {
      btn: {
        text: "OK",
        cb: () => {
          fetchTour();
          resetData();
        },
        component: "button",
      },
      message: "Thêm đánh giá thành công",
      type: "success",
      show: data,
      time: 2000,
      onHide: () => {
        fetchTour();
        resetData();
      },
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <Modal
        contentClassName={styles.container}
        {...props}
        onHide={() => {
          props.onHide();
          resetData();
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {isLoading && (
          <div className={styles.spinner}>
            <div className="spinner-border text-dark" role="status" />
          </div>
        )}

        <Modal.Header closeButton>
          <h5>Thêm đánh giá tour - {tour.code}</h5>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validate={validator}
          >
            <Form>
              <div className="row">
                <div className="col-8">
                  <label className="d-block mb-4">
                    <h6 className="fs-6 mb-1">Tên</h6>
                    <Field type="text" name="name" className="w-100 p-1" />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-danger"
                    />
                  </label>
                </div>

                <div className="col-4">
                  <label className="d-block mb-4">
                    <h6 className="fs-6 mb-1">Số sao</h6>
                    <Field as="select" name="stars" className="w-100 p-1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Field>
                    <ErrorMessage
                      name="stars"
                      component="p"
                      className="text-danger"
                    />
                  </label>
                </div>
              </div>

              <label className="d-block mb-4">
                <h6 className="fs-6 mb-1">Bình luận</h6>
                <Field as="textarea" name="content" className="w-100 p-1" />
                <ErrorMessage
                  name="content"
                  component="p"
                  className="text-danger"
                />
              </label>

              {error && <p className="text-danger mb-2">{error.message}</p>}

              <button className="btn btn-primary" type="submit">
                Đánh giá
              </button>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RatingModal;
