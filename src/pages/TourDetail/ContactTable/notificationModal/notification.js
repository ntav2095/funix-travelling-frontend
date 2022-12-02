import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import './notification.css'
import styles from './notification.css'
export default function NotificationModal({ err, message,errcallback,success }) {
  console.log("NotificationModal");
  console.log(err,message)
  const [state, setState] = useState(true);
  const time=err?10000:2000

  const modalTogglehandler = () => {
    setState(!state);
  };
    const modal = document.querySelector(".fade.modal-backdrop");
    modal.style.display='none'
    console.log("modal", modal);
 

  useEffect(() => {
    setTimeout(() => {
      modalTogglehandler();
      // if (errcallback) errcallback(false);
      if (success) success(false);
    }, time);
  }, []);

  return (
    <div>
      {err && (
        <div className="error">
          <Modal
            id="modalSuccess"
            size="sm"
            show={state}
            onHide={() => modalTogglehandler()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                <i class="fas fa-exclamation"></i>
                <p>ERROR</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {!err && (
        <Modal
          size="sm"
          show={state}
          onHide={() => modalTogglehandler()}
          dialogClassName={styles.modal}
          aria-labelledby="example-modal-sizes-title-sm "
        >
          <div className="success">
            <Modal.Body>
              <p className="notification">{message}</p>
            </Modal.Body>
          </div>
        </Modal>
      )}
    </div>
  );
}
