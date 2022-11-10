import Modal from "react-bootstrap/Modal";
import Spinner from "../Spinner";
import styles from "./SpinnerModal.module.css";

function SpinnerModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={styles.modalContent}
    >
      <Spinner />
    </Modal>
  );
}

export default SpinnerModal;
