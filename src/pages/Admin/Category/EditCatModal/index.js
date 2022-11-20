import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../import";
import { Formik, Field, ErrorMessage, Form } from "formik";
import styles from "./EditCatModal.module.css";
import { adminApis } from "../import";
import { SpinnerModal, useEffect } from "../import";
import Spinner from "../../../../components/Spinner";

import CatForm from "../CatForm";

function EditCatModal() {
  const [sendRequest, isLoading, isSuccess, error] = useAxios();

  const location = useLocation();
  const catItem = location.state?.catItem || null;
  const navigate = useNavigate();

  const initialValues = catItem
    ? {
        type: catItem.type,
        name: catItem.name,
        code: catItem.code,
        parent: catItem.parent?._id || "",
      }
    : null;
  const closeModal = (edited) => {
    navigate("/admin/category", {
      state: {
        edited,
      },
    });
  };

  const submitHandler = (values) => {
    sendRequest(
      adminApis.category.update({
        catId: catItem._id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Đã cập nhật thành công");
      closeModal(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      alert("Có lỗi xảy ra");
    }
  }, [error]);

  return (
    <Modal
      show={Boolean(catItem)}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ID: {catItem._id}
        </Modal.Title>
      </Modal.Header>

      <div className={styles.container}>
        <CatForm
          initialValues={initialValues}
          onSubmit={submitHandler}
          categories={location.state.categories}
        />
        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default EditCatModal;
