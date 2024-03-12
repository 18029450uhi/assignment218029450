import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebase'
import HintSection from './HintsSection';

const ParentComponent = () => {
  const [generalHints, setGeneralHints] = useState([]);
  const [ProblemSpecificHints, setProblemSpecificHints] = useState([]);
  const questionId="balances"

  async function fetchData() {
    const snapshot = await firestore.collection("Questions").doc(questionId).get();
    const questionData = snapshot.data();
    const questionDetails = questionData[questionId];
    if (questionDetails && questionDetails[questionId] && questionDetails[questionId].hints) {
      setGeneralHints(questionDetails[questionId].hints.generalHints || []);
      setProblemSpecificHints(questionDetails[questionId].hints.ProblemSpecificHints || []);
    }
  }
  
  useEffect(() => {
    fetchData(questionId);
  }, []);

  return (
    <div>
      <HintSection generalHints={generalHints} problemSpecificHints={ProblemSpecificHints} />
    </div>
  );
};

export default ParentComponent;
