import React, { useState } from "react";
import { firestore, storage } from "../../services/firebase";
import { Button } from "react-bootstrap";

const SendMessage = ({
  currentUser,
  setFetchUpdate,
  fetchUpdate,
  findExistingUser: isAdmin,
  selectedUser,
}) => {
  const [messageText, setMessageText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("currentUser", isAdmin);

  const addOrUpdateUser = async () => {
    const newUserForm = {
      email: currentUser?.email,
      uid: currentUser?.uid,
      displayName: currentUser?.displayName,
      photoURL: currentUser?.photoURL,
      role: "user",
      lastMessageTimestamp: new Date().getTime(),
    };

    try {
      const usersDocRef = firestore.collection("users");
      const userSnapshot = await usersDocRef
        .where("uid", "==", currentUser.uid)
        .get();

      if (userSnapshot.empty) {
        await usersDocRef.add(newUserForm);
      } else {
        // User exists, update the existing user
        const existingUserDoc = userSnapshot.docs[0];
        await existingUserDoc.ref.update({
          lastMessageTimestamp: new Date().getTime(),
        });
      }
    } catch (error) {
      console.log("Error adding/updating user:", error);
    }
  };

  const uploadImage = async () => {
    if (imageFile) {
      try {
        console.log("Uploading image...");
        const storageRef = storage.ref();
        const imageFileName = `${currentUser.uid}_${new Date().getTime()}_${
          imageFile.name
        }`;
        console.log("testing...");
        const imageFileRef = storageRef.child(imageFileName);

        // Upload the image to Firebase Storage
        const uploadTask = imageFileRef.put(imageFile);
        await uploadTask;

        // Get the URL of the uploaded image
        const imageUrl = await imageFileRef.getDownloadURL();
        console.log("Image uploaded successfully");
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    }
    return null;
  };

  const addMessage = async () => {
    try {
      console.log("Adding message...");

      const imageUrl = await uploadImage();

      const newMessage = {
        sender: currentUser?.email,
        receiver: isAdmin.role === "admin" ? selectedUser : "admin",
        text: messageText,
        messageType: imageUrl ? "image" : "text",
        img: imageUrl || "", // Set the image URL or an empty string if it's a text message
        timestamp: new Date().getTime(),
        userId: currentUser.uid,
        userRole: isAdmin.role === "admin" ? "admin" : "user",
      };

      const chatDocRef = firestore.collection("messages");
      await chatDocRef.add(newMessage);
      setMessageText(""); // Clear the input after sending the message
      setImageFile(null);
      setFetchUpdate(!fetchUpdate);
      setLoading(false); // Clear the image file after sending
      console.log("Message added successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error adding message:", error);
    }
  };

  const handleSend = async () => {
    if (currentUser && (messageText.trim() !== "" || imageFile)) {
      setLoading(true);
      await addOrUpdateUser();
      await addMessage();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="d-flex">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input
        disabled={loading}
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <Button disabled={loading} onClick={handleSend}>
        {loading ? "Sending...." : "Send"}
      </Button>
    </div>
  );
};

export default SendMessage;
