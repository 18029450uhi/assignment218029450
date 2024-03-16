import React from "react";

function AnswerSection({ quesData }) {
  const questions = quesData?.balances?.questions?.fullquestion;

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row mb-3">
          <div className=" col-sm d-grid gap-2">
            <button type="button" className="btn btn-secondary mb-2 p-4">
              {questions?.answer0}
            </button>
            <button type="button" className="btn btn-secondary mb-2 p-4">
              {questions?.answer3}
            </button>
          </div>
          <div className=" col-sm d-grid gap-2">
            <button type="button" className="btn btn-secondary mb-2 p-4">
              {questions?.answer2}
            </button>
            <button type="button" className="btn btn-secondary mb-2 p-4">
              {questions?.answer4}
            </button>
          </div>
        </div>
        <div className="row ">
          <div className=" col-sm-6  d-grid gap-2">
            <button type="button" className="btn btn-secondary mb-2 p-4">
              {questions?.answer5}
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
