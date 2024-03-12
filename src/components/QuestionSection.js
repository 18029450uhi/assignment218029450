import React, {useEffect, useState} from 'react'
import { firestore } from '../services/firebase'


function QuestionSection() {

  // eslint-disable-next-line no-unused-vars
  const [title,setTitle]= useState("")
  const [questionText,setQuestionText]= useState("")
  const [imageUri,setImageUri]=useState("")
  const questionId="balances"

  async function fetchData() {
    const snapshot = await firestore.collection('balances').get();

    const fetchedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // const snapshot = await firestore.collection("questions").doc(questionId).get()
    // const questionData = snapshot.data()
    const questionDetails = fetchedData[0]; //questionData[questionId]
    // console.log(questionDetails[questionId]);
    setImageUri(questionDetails[questionId].questions.fullquestion.questionimage);
    setTitle(questionDetails[questionId].questions.title)
    setQuestionText(questionDetails[questionId].questions.fullquestion.question)
  }

  useEffect(()=> {
    fetchData();
  })



    return (
        <div className="col-sm-6">
                    <h3 className="text-center">{title}</h3>
                    <div className="p-3 mb-2 bg-light">
                        <div className="text-center">
                           <img className="mb-4 rounded w-100 img-fluid" src={imageUri} alt=""  />

                        </div>
                        <p> {questionText}</p>
                    </div>
        </div>
    )
}

export default  QuestionSection;