// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// function HintsSection() {
//   const [buttons, setButtons] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const db = firebase.firestore();
//       const snapshot = await db.collection('hints').doc('balances').get();

//       const { titleColumn, video, title } = snapshot.data().hint;

//       const newButtons = title.map((row) => {
//         const rowButtons = titleColumn.map((column) => {
//           const matchingVideo = video.find((video) => {
//             return video.type === column.linkTitle && video.link === row.linkTitle;
//           });

//           if (matchingVideo) {
//             return (
//               <button key={matchingVideo.title} onClick={() => { /* Handle button click here */ }}>
//                 {matchingVideo.title}
//               </button>
//             );
//           } else {
//             return <button key={column.linkTitle} disabled>{column.columnTitle}</button>;
//           }
//         });

//         return (
//           <div key={row.linkTitle}>
//             <h3>{row.rowTitle}</h3>
//             {rowButtons}
//           </div>
//         );
//       });

//       setButtons(newButtons);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {buttons}
//     </div>
//   );
// }

// export default HintsSection;
import React, { useState, useEffect } from 'react';
import hintsData from './balances.json';
import { Modal, Button } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firestore } from '../services/firebase';

const HintsComponent = () => {
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [showMsgForm, setShowMsgForm] = useState(false);
    const [sentMsg, setSentMsg] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [formData, setFormData] = useState({
        inputMessage: '',
    });
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const fetchData = async () => {
        try {
            const snapshot = await firebase.firestore().collection('balances').get();
            const fetchedData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(fetchedData[0].balances.hint);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data from JSON file
        // setData(hintsData.balances.hint);
        // Fetch data from firebase
        fetchData();
        importCollection();
        setUserId(firebase.auth()?.currentUser?.uid)
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }


    function importCollection() {
        const data = hintsData;

        const collectionRef = firebase.firestore().collection('balances');

        collectionRef.add(data)
            .then((docRef) => {
                console.log('Document written with ID:', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding document:', error);
            });
        
        // data.forEach((dataObject) => {
        // collectionRef.add(dataObject)
        //         .then((docRef) => {
        //             console.log('Document written with ID:', docRef.id);
        //         })
        //         .catch((error) => {
        //             console.error('Error adding document:', error);
        //         });
        // });
    }

    const handleClose = () => setShow(false);
    const handleShow = (video) => {
        setCurrentVideo(video.image)
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
            validationErrors.inputMessage = 'Message is required';
        }

        // Update errors state
        setErrors(validationErrors);

        // If there are no errors, proceed with form submission
        if (Object.keys(validationErrors).length === 0) {
            // Perform form submission logic here
            let content = formData.inputMessage;
            let timestamp = Date.now();
            let image = '';
            let like = true;
            const message = { content, timestamp, userId, image, like }
            firestore.collection('Chats').add(message)
            setSentMsg(true);
            // Perform actions with form data
            // For example, send form data to a server using AJAX or fetch()

            // Reset the form
            setFormData({
                inputMessage: '',
            });
        }
    };

    const renderVideo = (link, type) => {
        const video = data.video.find((item) => item.link === link && item.type === type);
        if (!video) {
            console.error(`Video not found for link: ${link}, type: ${type}`);
            return null;
        }

        const buttonStyle = {
            backgroundColor: type === 'general' ? '#2596be' : '#198754',
            borderColor: type === 'general' ? '#2596be' : '#198754',
            color: '#fff',
            borderRadius: '4px',
            padding: '0.5rem',
            display: 'block',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
        };

        return (
            <div style={{ textAlign: 'center' }}>
                {/* {() => alert(`Displaying video: ${video.title}`)} */}
                <button className='d-block w-100' style={buttonStyle} onClick={() => handleShow(video)}>
                    Video
                </button>
                <button className='d-block w-100' style={buttonStyle} onClick={() => alert(`Displaying image: ${video.image}`)}>
                    Summary
                </button>
            </div>
        );
    };




    const renderSections = () => {
        return data.title.map((title) => {
            return (
                <div className='row' key={title.linkTitle} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h4 className='col-sm-2' style={{ marginRight: '1.5rem' }}>{title.rowTitle}</h4>
                    <div className='col-sm-9 row' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', flexGrow: 1 }}>
                        {data.titleColumn.map((column, index) => {
                            if (index === 0) return null;
                            return (
                                <div className='col-sm-6' key={column.linkTitle} style={{ marginLeft: index === 1 ? '-5px' : '', marginBottom: '1rem', border: '2px solid #239ac5',borderRadius: '2%' }}>
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
        <div className="row col-sm-6" style={{ margin: '0 auto', background: '#f5f5f5' }}>
            <h2 className='text-center'> Hints</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                {data.titleColumn.map((column, index) => {
                    if (index === 0) {
                        return (
                            <div key={index} className="col-sm-2 d-grid gap-2"></div>
                        );
                    }
                    return (
                        <div className="col-sm-5 d-grid gap-2" key={column.linkTitle} style={{ textAlign: 'center' }}>
                            <h5 style={{ color: (column.linkTitle === 'general' ? '#2596be' : '#198754') }}>{column.columnTitle}</h5>
                        </div>
                    );
                })}
            </div>
            {renderSections()}
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                { sentMsg ?
                    <>
                        <Modal.Body>
                        <p className='text-center'>Your message was sent, and you will get a reply within 3 days</p>
                        </Modal.Body>
                        <Modal.Footer style={{ display: 'block'}}>
                            <Button variant="primary" className='me-3' size='sm'>
                                Sent
                            </Button>
                        </Modal.Footer>
                    </>
                    :
                    <>
                        <Modal.Body>
                            <img className="mb-4 rounded img-fluid" src={'/img/' + currentVideo} alt="" />
                        </Modal.Body>
                        <Modal.Footer style={{ display: 'grid' }}>
                        {showMsgForm
                            ?
                            <div>
                                <p>What have you found confusing about this video?</p>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <textarea name="inputMessage" value={formData.inputMessage} onChange={handleInputChange} rows={3} cols={100} placeholder='This is where the messages goes.' />
                                        {errors.inputMessage && <span className='text-danger'>{errors.inputMessage}</span>}
                                    </div>
                                    <Button variant="primary" className='me-3' size='sm' type="submit">
                                        Send
                                    </Button>
                                    <Button variant="outline-primary" size='sm' onClick={() => { setShowMsgForm(false); setErrors({}) }}>
                                        Cancel
                                    </Button>
                                </form>
                            </div>
                            :
                        <Button variant="danger" size='sm' onClick={() => setShowMsgForm(true)}>
                            Confused
                        </Button>}
                    </Modal.Footer></>
                }
            </Modal>
        </div>
    );
};

export default HintsComponent;