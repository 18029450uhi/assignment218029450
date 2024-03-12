import React, { useEffect, useState } from 'react';
import { firestore } from '../services/firebase';
function AnswerSection() {
const [answer0, setAnswer0] = useState([]);
const [answer1,setAnswer1]= useState([]);
const [answer2,setAnswer2]= useState([]);
const [answer3,setAnswer3]= useState([]);
const [answer4,setAnswer4]= useState([]);
const [answer5,setAnswer5]= useState([]);
const questionId = 'balances';

async function fetchData() {
   // const snapshot = await firestore.collection('Questions').doc(questionId).get();
   // const questionData = snapshot.data();
   // const questionDetails = questionData[questionId];
   // console.log(questionDetails)
   const snapshot = await firestore.collection('balances').get();
   const fetchedData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   }));
   const questionDetails = fetchedData[0];
   setAnswer0(questionDetails[questionId].questions.fullquestion.answer0)
   setAnswer1(questionDetails[questionId].questions.fullquestion.answer1)
   setAnswer2(questionDetails[questionId].questions.fullquestion.answer2)
   setAnswer3(questionDetails[questionId].questions.fullquestion.answer3)
   setAnswer4(questionDetails[questionId].questions.fullquestion.answer4)
   setAnswer5(questionDetails[questionId].questions.fullquestion.answer5)
   
   
   //if (
   //questionDetails && questionDetails[questionId] && questionDetails[questionId].questions &&
   //questionDetails[questionId].questions.fullquestion
   //) {
   //const { answers } = questionDetails[questionId].questions.fullquestion.answer;
   //setAnswers(answers || []);
   //}
   //}
}
useEffect(() => {
   fetchData(questionId);
})
// [questionId]);

return (
<div className="col-12">
   <h3 className="text-center">Answer</h3>
   <div className="p-3 mb-2 bg-light">
            <div className="row mb-3">
      <div className=" col-sm d-grid gap-2">
       
            <button type="button" className="btn btn-secondary mb-2 p-4"  >
            {answer0}
            </button>
            <button type="button" className="btn btn-secondary mb-2 p-4"  >
            {answer3}
            </button>
            
            
      </div>
      <div className=" col-sm d-grid gap-2">

    <button type="button" className="btn btn-secondary mb-2 p-4" >
      {answer2}
      </button>
      <button type="button" className="btn btn-secondary mb-2 p-4" >
      {answer4}
      </button>
     </div>  
      </div>
      <div className="row ">
      <div className=" col-sm-6  d-grid gap-2">
         <button type="button" className="btn btn-secondary mb-2 p-4"  >
            {answer5}
            </button>
</div>
<div className='row'>
   <div className="col-sm text-center">
         < button type="button" className="btn btn-primary
          mb-2 p-4">
            {answer1}
         </button>
   </div>
   </div>
</div>
</div>
</div>
);
}

export default AnswerSection;