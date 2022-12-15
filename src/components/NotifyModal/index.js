import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function NotifyModal({ time, message, type = "normal", ...props }) {
  useEffect(() => {
    if (time && props.show) {
      setTimeout(() => {
        props.onHide();
      }, time);
    }
  }, [props.show]);
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
}

export default NotifyModal;
