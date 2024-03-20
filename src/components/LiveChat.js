import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";

import "firebase/compat/auth";

import "firebase/compat/storage";
import { Button, Modal } from "react-bootstrap";

function LiveChat({ show, handleClose }) {
  const [text, setText] = useState([]); //message instead of text
  const [userId, setUserId] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const admin = ["VG9uye9b8DTQDsFYnvNIxPd2FoC2"];
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const messagesRef = firestore.collection("messages");



  useEffect(() => {
    setUserId(firebase.auth()?.currentUser?.uid);
    setLocalMessages([]);
  }, []);
  

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <div>
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "40vh",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              marginLeft: 24,
              marginRight: 24,
              overflow: "auto",
              marginBottom: 24,
            }}
          >
            {localMessages?.map((localMessage) => (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent:
                    userId === localMessage?.uid ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    minHeight: 52,
                    width: 600,
                    backgroundColor:
                      userId === localMessage?.uid
                        ? "grey"
                        : localMessage?.like === true
                        ? "green"
                        : "blue",
                    marginTop: 24,
                    paddingLeft: 24,
                    paddingRight: 24,
                    borderRadius: 12,
                  }}
                >
                  <p>{localMessage.content}</p>
                  {localMessage?.image && localMessage.iamge.length > 0 && (
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        marginBottom: 24,
                      }}
                      src={localMessage.iamge}
                      alt=""
                    />
                  )}
                  {userId !== localMessage.uid &&
                    admin.includes(userId) &&
                    localMessage.like === false && (
                      <button
                        style={{
                          backgroundColor: "whitesmoke",
                          color: "black",
                          fontSize: 22,
                          marginBottom: 24,
                          borderWidth: 0,
                          fontWeight: "bold",
                          borderRadius: 8,
                          paddingTop: 4,
                          paddingBottom: 4,
                          paddingLeft: 8,
                          paddingRight: 8,
                        }}
                        onClick={async () => {
                          await firestore
                            .collection("LiveChat")
                            .doc(localMessage.mid)
                            .update({
                              like: true,
                            });
                        }}
                      >
                        Add to FAQ
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: 244 }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                const timestamp = Date.now();
                let image = "";
                const content = text;
                const uid = userId;
                const like = false;
                if (localImage) {
                  const uniqueLocalImage = `${localImage.name_$Math
                    .random()
                    .toString(36)}`;
                  const uploadTask = storage
                    .ref("/images/$(uniqueLocalImage}")
                    .put(localImage);
                  uploadTask.on(
                    "state_changed",
                    () => {},
                    () => {},
                    async () => {
                      const fireBaseUrl = await storage
                        .ref("images")
                        .child(uniqueLocalImage)
                        .getDownloadURL();
                      const message = {
                        content,
                        timestamp,
                        uid,
                        image: fireBaseUrl,
                        like,
                      };
                      const docRef = await firestore
                        .collection("Chats")
                        .add(message);
                     
                    }
                  );
                } else {
                  const message = { content, timestamp, uid, image, like };
                  const docRef = await firestore
                    .collection("Chats")
                    .add(message);
                 
                }
                setText("");
                setLocalImage(null);
              }}
            >
              <input
                key={Date.now()}
                type="file"
                onChange={(e) => {
                  const image = e.target.files[0];
                
                  setLocalImage(image);
                }}
              />
              <input type="text" name="message" />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LiveChat;
