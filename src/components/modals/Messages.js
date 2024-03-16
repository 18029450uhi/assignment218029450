import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import firebase from "firebase/compat/app";
import { firestore } from "../../services/firebase";
import SendMessage from "../messages/SendMessage";

const Messages = ({ show, handleClose }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const findExistingUser = userData.find(
    (user) => user?.email === currentUser?.email
  );

  const myMessage = messagesData
    .filter(
      (m) =>
        m?.sender === currentUser?.email || m?.receiver === currentUser?.email
    )
    .reverse();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = firestore.collection("users");
        const messagesRef = firestore
          .collection("messages")
          .orderBy("timestamp", "desc");
        const usersSnapShot = await usersRef.get();
        const messageSnapShot = await messagesRef.get();

        const newUserData = usersSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const newMessagesData = messageSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserData(newUserData);
        setMessagesData(newMessagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchData();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Modal
      size="xl"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body  style={{ height: "80vh", overflowY: "scroll" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {/* Display messages */}
            <div className="col-md-5 bg-light ">
              <h1 className="">Chat History</h1>
              {userData.map((message) => (
                <p key={message.id}>{message.text}</p>
              ))}
            </div>
            {/* Display current conversation */}
            <div
              className="col-md-7"
              style={{ height: "100%", overflow: "auto" }}
            >
              <div>
                {myMessage?.map((message) => (
                  <>
                    <div
                      className={`w-50 ${
                        message.sender === currentUser?.email && "ms-auto"
                      }`}
                    >
                      {message.messageType === "text" && (
                        <p
                          key={message.id}
                          className={
                            message.sender === currentUser?.email
                              ? "text-end bg-primary rounded text-white p-4"
                              : "text-start bg-secondary rounded text-white p-4"
                          }
                        >
                          {message?.text}
                        </p>
                      )}
                      {message.messageType === "image" && (
                        <img
                          style={{
                            backgroundColor: "#0e6efd",
                            padding: "5px",
                            border: "1px solid",
                          }}
                          key={message.id}
                          className="mb-4 rounded w-100 img-fluid"
                          src={message?.img}
                          alt=""
                        />
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <SendMessage currentUser={currentUser} />
      </Modal.Footer>
    </Modal>
  );
};

export default Messages;
