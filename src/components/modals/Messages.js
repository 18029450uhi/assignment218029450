import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import firebase from "firebase/compat/app";
import { firestore } from "../../services/firebase";
import SendMessage from "../messages/SendMessage";
import UserList from "../messages/UserList";
import moment from "moment";
import FaqButton from "../messages/FaqButton";

const Messages = ({ show, handleClose, updatedData, setUpdatedData }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchUpdate, setFetchUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const messagesContainerRef = useRef(null);

  const findExistingUser = userData.find(
    (user) => user?.email === currentUser?.email
  );

  const myMessage = messagesData.filter(
    (m) =>
      m?.sender === currentUser?.email || m?.receiver === currentUser?.email
  );
  // .reverse();

  const adminMessage = messagesData.filter(
    (m) => m?.receiver === selectedUser || m?.sender === selectedUser
  );
  // .reverse();

  const showMessages =
    findExistingUser?.role === "admin" ? adminMessage : myMessage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = firestore
          .collection("users")
          .orderBy("lastMessageTimestamp", "desc");
        const messagesRef = firestore
          .collection("messages")
          .orderBy("timestamp", "desc");
        const usersSnapShot = await usersRef.get();
        const messageSnapShot = await messagesRef.get();

        const newUserData = usersSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        const newMessagesData = messageSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUserData(newUserData);
        setMessagesData(newMessagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [fetchUpdate]);

  useEffect(() => {
    // Scroll to the bottom when messagesData changes
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [messagesData]);

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
      <Modal.Body>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {/* Display messages */}
            <div
              className="col-md-5"
              style={{ borderRight: "1px solid #9da3a8" }}
            >
              <UserList
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                userData={userData}
                findExistingUser={findExistingUser}
              />
            </div>
            {/* Display current conversation */}
            <div className="col-md-7" style={{ height: "100%" }}>
              <div
                style={{
                  height: "60vh",
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column-reverse"
                }}
              >
                {showMessages?.map((message) => (
                  <div
                    key={message.id}
                    style={{ width: "45%" }}
                    className={` ${
                      message.sender === currentUser?.email && "ms-auto"
                    }`}
                  >
                    {message?.messageType === "text" && (
                      <div className="mb-4">
                        <div
                          className={
                            message?.sender === currentUser?.email
                              ? "bg-primary rounded text-white p-3 "
                              : "bg-secondary rounded text-white p-3 "
                          }
                        >
                          {message?.videoTitle && (
                            <span className=" bg-warning text-dark p-1 px-3 rounded">
                              {message?.videoTitle}
                            </span>
                          )}
                          <p className={`${message?.videoTitle && "mt-1"}`}>
                            {" "}
                            {message?.text}
                          </p>
                          {findExistingUser.role === "admin" &&
                            message?.receiver !== "admin" && (
                              <div className="text-center py-2">
                                <FaqButton
                                  message={message}
                                  updatedData={updatedData}
                                  setUpdatedData={setUpdatedData}
                                />
                              </div>
                            )}
                        </div>

                        <span style={{ fontSize: "12px" }}>
                          {moment(message?.timestamp)?.fromNow()}
                        </span>
                      </div>
                    )}
                    {message?.messageType === "image" && (
                      <div className="mb-4">
                        <div
                          style={{
                            backgroundColor: "#0e6efd",
                            padding: "5px",
                            border: "1px solid"
                          }}
                        >
                          <img
                            className=" rounded w-100 img-fluid"
                            src={message?.img}
                            alt=""
                          />
                          {findExistingUser.role === "admin" &&
                            message?.receiver !== "admin" && (
                              <div className="text-center py-2">
                                <FaqButton
                                  message={message}
                                  updatedData={updatedData}
                                  setUpdatedData={setUpdatedData}
                                />
                              </div>
                            )}
                        </div>
                        <span style={{ fontSize: "12px" }}>
                          {moment(message?.timestamp)?.fromNow()}
                        </span>
                      </div>
                    )}

                    {message.messageType === "both" && (
                      <div className="mb-4 ">
                        <div
                          style={{
                            backgroundColor:
                              message?.sender === currentUser?.email
                                ? "#0e6efd"
                                : "#9da3a8",
                            padding: "5px",
                            border: "1px solid"
                          }}
                        >
                          <p
                            className={
                              message?.sender === currentUser?.email
                                ? "bg-primary rounded text-white p-3 "
                                : "bg-secondary rounded text-white p-3 "
                            }
                          >
                            {message?.text}
                          </p>
                          <img
                            style={{ border: "1px solid" }}
                            className=" rounded w-100 img-fluid "
                            src={message?.img}
                            alt=""
                          />
                          {findExistingUser.role === "admin" &&
                            message?.receiver !== "admin" && (
                              <div className="text-center py-2">
                                <FaqButton
                                  message={message}
                                  updatedData={updatedData}
                                  setUpdatedData={setUpdatedData}
                                />
                              </div>
                            )}
                        </div>
                        <span style={{ fontSize: "12px" }}>
                          {moment(message?.timestamp)?.fromNow()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Create a reference for the container */}
              <div ref={messagesContainerRef}></div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ background: "#f8f9fa" }}>
        <SendMessage
          currentUser={currentUser}
          setFetchUpdate={setFetchUpdate}
          fetchUpdate={fetchUpdate}
          findExistingUser={findExistingUser}
          selectedUser={selectedUser}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default Messages;
