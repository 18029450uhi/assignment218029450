import React from 'react';
import firebase from "firebase/compat/app";

const LiveChatTest = () => {
    const firestore = firebase.firestore();
    const storage = firebase.storage();
    console.log("f",firestore);
    console.log("s",storage);
    return (
        <div>
            <h1>test</h1>
        </div>
    );
};

export default LiveChatTest;