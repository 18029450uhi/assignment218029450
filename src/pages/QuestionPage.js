import QuestionSection from "../components/QuestionSection";
import HintsSection from "../components/HintsSection";
import AnswerSection from "../components/AnswerSection";
import ProfileButton from "../components/ProfileButton";

import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { Spinner } from "react-bootstrap";

function QuestionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const snapshot = await firestore?.collection("balances").get();

      if (snapshot.docs.length > 0) {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData[0] || null);
      } else {
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

  const [messageList, setMessageList] = useState(null);

  const fetchMessages = async () => {
    try {
      const chatCollection = firestore.collection("Chats");
      const querySnapshot = await chatCollection.get();

      const messages = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document in "Chats" has a 'message' field
        const message = doc.data().message;
        messages.push(message);
      });

      setMessageList(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  console.log("messageList", messageList);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ height: "100vh" }}
      >
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("data", data);

  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3">
        <ProfileButton />
      </div>
      <h1 className="text-center">Question Page</h1>
      <div className="row">
        <QuestionSection quesData={data} />
        <HintsSection quesData={data} />
      </div>
      <div className="row">
        <AnswerSection quesData={data} />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </div>
  );
}
export default QuestionPage;
