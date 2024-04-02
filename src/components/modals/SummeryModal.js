import React from "react";
import { Modal } from "react-bootstrap";

const SummeryModal = ({ summeryShow, handleSummeryClose, summeryData }) => {
  return (
    <Modal
      show={summeryShow}
      onHide={handleSummeryClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>Summery</Modal.Header>

      <Modal.Body>
        <div className="row">
          
          <img
            style={{ border: "1px solid" }}
            className="rounded w-50 mx-auto d-block"
            src={summeryData?.image}
            alt=""
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SummeryModal;
