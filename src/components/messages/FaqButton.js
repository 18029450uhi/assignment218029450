import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FaqModal from "./FaqModal";

const FaqButton = ({ message, updatedData, setUpdatedData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("message", message);

  const fetchData = async () => {
    try {
      setLoading(true);
      const questionRef = ref(getDatabase(), `balances`);
      const snapshot = await get(questionRef);

      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No such document!");
        setData(null);
      }
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button disabled={loading} className="btn-light" onClick={handleShow}>
        Add to FAQ's
      </Button>

      {show && (
        <FaqModal
          show={show}
          handleClose={handleClose}
          videos={data?.hint?.video}
          message={message}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
        />
      )}
    </>
  );
};

export default FaqButton;
