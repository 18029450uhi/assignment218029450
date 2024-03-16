import { getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { calculatePercentage } from "../utils/calculatePercentage ";

function AnswerSection({ quesData, updatedData, setUpdatedData }) {
  const questions = quesData?.questions?.fullquestion;
  const result = questions?.result || {};
  const ansList = result?.answerList;

  const values = result?.answerList ? Object?.values(result?.answerList) : [];
  const sum = values.reduce((acc, value) => acc + value, 0);

  const calculateOption0 = calculatePercentage(ansList?.answer0, sum);
  const calculateOption2 = calculatePercentage(ansList?.answer2, sum);
  const calculateOption3 = calculatePercentage(ansList?.answer3, sum);
  const calculateOption4 = calculatePercentage(ansList?.answer4, sum);
  const calculateOption5 = calculatePercentage(ansList?.answer5, sum);

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  console.log("selected Answer", result?.selectedAnswer);

  const alreadySelected =
    Object?.values(result?.selectedAnswer).find(
      (answer) => answer?.userEmail === user?.email
    ) || {};

  console.log("already selected Answer", alreadySelected);

  const handleUpdateAnswer = async (answerKey, answer) => {
    console.log("", answerKey, answer);
    try {
      const questionRef = ref(
        getDatabase(),
        `/balances/questions/fullquestion/result`
      );

      // Update the 'selectedAnswer' field
      await update(questionRef, {
        answerList: {
          ...result?.answerList,
          [answerKey]: (result?.answerList?.[answerKey] || 0) + 1,
        },
        selectedAnswer: [
          ...result?.selectedAnswer,
          { userEmail: user.email, answer: answerKey },
        ],
      });
      setUpdatedData(!updatedData);
      console.log("Answer updated successfully!");
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row mb-3">
          <div className=" col-sm d-grid gap-2">
            <button
              disabled={alreadySelected?.userEmail}
              onClick={() =>
                handleUpdateAnswer("answer0", questions?.answer0[0])
              }
              type="button"
              className={`btn btn-secondary mb-2 p-4 ${
                alreadySelected?.answer === "answer0" && "selected"
              }`}
            >
              <span> {questions?.answer0}</span>{" "}
              {alreadySelected?.userEmail && (
                <span className="fw-bold ml-25">({calculateOption0})</span>
              )}
            </button>
            <button
              disabled={alreadySelected?.userEmail}
              onClick={() =>
                handleUpdateAnswer("answer3", questions?.answer3[0])
              }
              type="button"
              className={`btn btn-secondary mb-2 p-4 ${
                alreadySelected?.answer === "answer3" && "selected"
              }`}
            >
              <span> {questions?.answer3}</span>{" "}
              {alreadySelected?.userEmail && (
                <span className="fw-bold ml-25">({calculateOption3})</span>
              )}
            </button>
          </div>
          <div className=" col-sm d-grid gap-2">
            <button
              disabled={alreadySelected?.userEmail}
              type="button"
              className={`btn btn-secondary mb-2 p-4 ${
                alreadySelected?.answer === "answer2" && "selected"
              }`}
              onClick={() =>
                handleUpdateAnswer("answer2", questions?.answer2[0])
              }
            >
              <span> {questions?.answer2}</span>
              {alreadySelected?.userEmail && (
                <span className="fw-bold ml-25">({calculateOption2})</span>
              )}
            </button>
            <button
              disabled={alreadySelected?.userEmail}
              type="button"
              className={`btn btn-secondary mb-2 p-4 ${
                alreadySelected?.answer === "answer4" && "selected"
              }`}
              onClick={() =>
                handleUpdateAnswer("answer4", questions?.answer4[0])
              }
            >
              <span> {questions?.answer4}</span>{" "}
              {alreadySelected?.userEmail && (
                <span className="fw-bold ml-25">({calculateOption4})</span>
              )}
            </button>
          </div>
        </div>
        <div className="row ">
          <div className=" col-sm-6  d-grid gap-2">
            <button
              disabled={alreadySelected?.userEmail}
              type="button"
              className={`btn btn-secondary mb-2 p-4 ${
                alreadySelected?.answer === "answer5" && "selected"
              }`}
              onClick={() =>
                handleUpdateAnswer("answer5", questions?.answer5[0])
              }
            >
              <span> {questions?.answer5}</span>{" "}
              {alreadySelected?.userEmail && (
                <span className="fw-bold ml-25">({calculateOption5})</span>
              )}
            </button>
          </div>
          <div className="row">
            <div className="col-sm text-center">
              <button type="button" className="btn btn-primary mb-2 p-4">
                {questions?.answer1}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerSection;
