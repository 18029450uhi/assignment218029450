import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firestore } from "../services/firebase";
import SummeryModal from "./modals/SummeryModal";

const HintsComponent = ({ quesData }) => {
  const data = quesData?.hint;
  //   modal
  const [show, setShow] = useState(false);
  const [summeryShow, setSummeryShow] = useState(false);
  const [summeryData, setSummeryData] = useState({});

  const [showMsgForm, setShowMsgForm] = useState(false);
  const [sentMsg, setSentMsg] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [youtbeVideo, setYoutubeVideo] = useState(null);
  const [linkType, setLinkType] = useState(null);
  const [faq, setFaq] = useState([]);
  const [formData, setFormData] = useState({
    inputMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);

  const findExistingUser = users.find(
    (user) => user?.email === currentUser?.email
  );

  const faqData = faq.slice(1);

  useEffect(() => {
    setCurrentUser(firebase.auth()?.currentUser);
  }, []);

  const fetchData = async () => {
    try {
      const usersRef = firestore.collection("users");
      const usersSnapShot = await usersRef.get();
      const newUserData = usersSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(newUserData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleSummeryClose = () => setSummeryShow(false);

  const handleSummeryShow = (data) => {
    setSummeryData(data);
    setSummeryShow(true);
  };

  const handleShow = (video) => {
    console.log(video);
    setCurrentVideo(video.image);
    setYoutubeVideo(video?.video);
    setLinkType(video?.type + " " + video?.link);
    setFaq(video?.faq);
    setErrors({});
    setShowMsgForm(false);
    setSentMsg(false);
    setShow(true);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.inputMessage) {
      validationErrors.inputMessage = "Message is required";
    }

    setErrors(validationErrors);

    const message = {
      videoTitle: linkType,
      sender: currentUser?.email,
      receiver: "admin",
      text: formData?.inputMessage,
      messageType: "text",
      img: "", // Set the image URL or an empty string if it's a text message
      timestamp: new Date().getTime(),
      userId: currentUser.uid,
      userRole: "user",
      faqAdded: false,
    };

    const newUserForm = {
      email: currentUser?.email,
      uid: currentUser?.uid,
      displayName: currentUser?.displayName,
      photoURL: currentUser?.photoURL,
      role: "user",
      lastMessageTimestamp: new Date().getTime(),
    };

    if (Object.keys(validationErrors).length === 0) {
      firestore.collection("messages").add(message);
      if (!findExistingUser) {
        firestore.collection("users").add(newUserForm);
      }

      setSentMsg(true);
      setFormData({
        inputMessage: "",
      });
    }
  };

  const renderVideo = (link, type) => {
    const video = data.video.find(
      (item) => item.link === link && item.type === type
    );
    if (!video) {
      console.error(`Video not found for link: ${link}, type: ${type}`);
      return null;
    }

    const buttonStyle = {
      backgroundColor: type === "general" ? "#2596be" : "#198754",
      borderColor: type === "general" ? "#2596be" : "#198754",
      color: "#fff",
      borderRadius: "4px",
      padding: "0.5rem",
      display: "block",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    };

    return (
      <div style={{ textAlign: "center" }}>
        <button
          className="d-block w-100"
          style={buttonStyle}
          onClick={() => handleShow(video)}
        >
          Video
        </button>
        <button
          className="d-block w-100"
          style={buttonStyle}
          onClick={() => handleSummeryShow(video)}
        >
          Summary
        </button>
      </div>
    );
  };

  const renderSections = () => {
    return data?.title.map((title) => {
      return (
        <div
          className="row"
          key={title?.linkTitle}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <h4 className="col-sm-2" style={{ marginRight: "1.5rem" }}>
            {title?.rowTitle}
          </h4>
          <div
            className="col-sm-9 row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              flexGrow: 1,
            }}
          >
            {data?.titleColumn.map((column, index) => {
              if (index === 0) return null;
              return (
                <div
                  className="col-sm-6"
                  key={column?.linkTitle}
                  style={{
                    marginLeft: index === 1 ? "-5px" : "",
                    marginBottom: "1rem",
                    border: "2px solid #239ac5",
                    borderRadius: "2%",
                  }}
                >
                  {renderVideo(title.linkTitle, column.linkTitle)}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="row col-sm-6">
      <h2 className="text-center"> Hints</h2>
      <div className="p-4" style={{ margin: "0 auto", background: "#f5f5f5" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          {data?.titleColumn.map((column, index) => {
            if (index === 0) {
              return <div key={index} className="col-sm-2 d-grid gap-2"></div>;
            }
            return (
              <div
                className="col-sm-5 d-grid gap-2"
                key={column.linkTitle}
                style={{ textAlign: "center" }}
              >
                <h5
                  style={{
                    color:
                      column.linkTitle === "general" ? "#2596be" : "#198754",
                  }}
                >
                  {column.columnTitle}
                </h5>
              </div>
            );
          })}
        </div>
        {renderSections()}
        <Modal
          show={show}
          onHide={handleClose}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          {sentMsg ? (
            <>
              <Modal.Body>
                <p className="text-center">
                  Your message was sent, and you will get a reply within 3 days
                </p>
              </Modal.Body>
              <Modal.Footer style={{ display: "block" }}>
                <Button variant="primary" className="me-3" size="sm">
                  Sent
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-4 mx-auto" style={{ height: "100%" }}>
                    <h4 className="text-center mb-4">FAQ</h4>
                    <div>
                      {faqData.map((f, index) => (
                        <div
                          key={index}
                          className="mb-4 w-75 mx-auto"
                          style={{
                            backgroundColor: "#9da3a8",
                            padding: "5px",
                            border: "1px solid",
                            borderRadius: "10px",
                          }}
                        >
                          <div>
                            <p className="text-center">{f?.text}</p>
                            <img
                              style={{ border: "1px solid" }}
                              className="rounded w-50 mx-auto d-block"
                              src={f?.image}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-8">
                    {youtbeVideo ? (
                      <iframe
                        className="w-100"
                        height={500}
                        src={youtbeVideo}
                        title="d"
                      />
                    ) : (
                      <img
                        className="mb-4 rounded img-fluid"
                        src={"/img/" + currentVideo}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer style={{ display: "grid" }}>
                {showMsgForm ? (
                  <div>
                    <p>What have you found confusing about this video?</p>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <textarea
                          name="inputMessage"
                          value={formData.inputMessage}
                          onChange={handleInputChange}
                          rows={3}
                          cols={100}
                          placeholder="This is where the messages goes."
                        />
                        {errors.inputMessage && (
                          <span className="text-danger">
                            {errors.inputMessage}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="primary"
                        className="me-3"
                        size="sm"
                        type="submit"
                      >
                        Send
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setShowMsgForm(false);
                          setErrors({});
                        }}
                      >
                        Cancel
                      </Button>
                    </form>
                  </div>
                ) : (
                  <>
                    {findExistingUser?.role !== "admin" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setShowMsgForm(true)}
                      >
                        Confused
                      </Button>
                    )}
                  </>
                )}
              </Modal.Footer>
            </>
          )}
        </Modal>
        <SummeryModal
          summeryShow={summeryShow}
          handleSummeryClose={handleSummeryClose}
          summeryData={summeryData}
        />
      </div>
    </div>
  );
};

export default HintsComponent;
