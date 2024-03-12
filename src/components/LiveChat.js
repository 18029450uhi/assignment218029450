import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";

import "firebase/compat/auth";
//import firebase from 'firebase/compat/app';

//import "firebae/compat/auth";
import "firebase/compat/storage";
import { Modal } from "react-bootstrap";
//import "firebase/compat/database"
//import { QuerySnapshot } from 'firebase/firestore';

function LiveChat({show, handleClose}) {
  const [text, setText] = useState([]); //message instead of text
  const [userId, setUserId] = useState("");
  // const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const admin = ["VG9uye9b8DTQDsFYnvNIxPd2FoC2"];
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  //const [adminReply, setAdminReply] = useState('');
  //const [showAdminReply, setShowAdminReply] = useState(false);

  // async function getUsers() {
  //   if (firebase.auth().currentUser.uid) {
  //     const users = firebase.database().ref("users");
  //     users.once('value')
  //       .then(async (snapshot) => {
  //         const usersData = snapshot.val();
  //         const userIds = usersData ? Object.keys(usersData) : [];
  //         if (!userIds.includes(firebase.auth().currentUser?.uid)) {
  //           await firebase.database().ref("users/" + firebase.auth().currentUser.uid).set({ online: true });
  //         } else {
  //           await firebase.database().ref("users/" + firebase.auth().currentUser.uid).set(true);
  //         }
  //       })
  //     firebase.database().ref(`users/${firebase.auth().currentUser.uid}/online`).onDisconnect().set(false);
  //   }
  // }

  useEffect(() => {
    setUserId(firebase.auth()?.currentUser?.uid);
    setLocalMessages([]);
    // var query = firestore.collection('Chats').orderBy("timestamp", "asc");
    // query.onSnapshot({
    //   next: (QuerySnapshot) => {
    //     let messages = []
    //     QuerySnapshot.forEach((doc) => {
    //       // console.log(doc.id, '=>' ,doc.data());
    //       messages.push({ mid: doc.id, ...doc.data() })
    //     });
    //     setLocalMessages(messages)
    //   },
    // });
    // getUsers();
  }, []);
  console.log(localMessages);

  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
    <div>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100vh",
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
                    style={{ width: "100%", height: "auto", marginBottom: 24 }}
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
        <button
          style={{
            backgroundColor: "whitesmoke",
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            borderWidth: 0,
          }}
          onClick={async () => {
            await firebase
              .database()
              .ref(`users/${firebase.auth().currentUser.uid}/online`)
              .set(false);
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 244 }}>
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
                    console.log(docRef);
                  }
                );
              } else {
                const message = { content, timestamp, uid, image, like };
                const docRef = await firestore.collection("Chats").add(message);
                console.log(docRef);
              }
              setText("");
              setLocalImage(null);
            }}
          >
            <input
              key={Date.now()}
              style={{ flex: 1 }}
              type="file"
              onChange={(e) => {
                const image = e.target.files[0];
                console.log(image);
                setLocalImage(image);
              }}
            />
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: "blanchedalmond",
                color: "white",
                fontWeight: "bold",
                borderWidth: 0,
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    </Modal>
  );
}

export default LiveChat;
