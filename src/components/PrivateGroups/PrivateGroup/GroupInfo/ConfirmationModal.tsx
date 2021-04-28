import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({ show, handleClose, title, text, handleSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSuccess}>
          Leave
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
