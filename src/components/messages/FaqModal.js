import { getDatabase, ref, update } from "firebase/database";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { firestore } from "../../services/firebase";

const FaqModal = ({
  show,
  handleClose,
  videos,
  message,
  updatedData,
  setUpdatedData,
}) => {
  const handleUpdateFAQ = async (video, index) => {
    try {
      const FAQREf = ref(getDatabase(), `/balances/hint/video/${index}`);
      const messageDocRef = firestore.collection("messages").doc(message?.id); // Assuming message?.id is the document ID
      await messageDocRef.update({
        faqAdded: true,
      });

      // Update the 'faq' field
      const updatedFaq = [
        ...videos[index]?.faq,
        { image: message.img, text: message.text },
      ];
      await update(FAQREf, { faq: updatedFaq });

      setUpdatedData(!updatedData);
  
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  console.log("m", message);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="row">
          {videos.map((video, index) => (
            <div className="col-md-4 ">
              <div
                className="p-3 m-2 rounded"
                style={{ background: "#9da3a8", cursor:'pointer' }}
                onClick={() => handleUpdateFAQ(video, index)}
              >
                <p>
                  {video.type} {video?.link}
                </p>
                <img
                  style={{ width: "200px" }}
                  src={"/img/" + video?.image}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Add </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FaqModal;
