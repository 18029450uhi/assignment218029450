import React from "react";

function QuestionSection({ quesData }) {
  const title = quesData?.balances?.questions?.title || " ";
  const questionText =
    quesData?.balances?.questions?.fullquestion?.question || "";
  const imageUri =
    quesData?.balance?.questions?.fullquestion?.questionimage || "";

  return (
    <div className="col-sm-6">
      <h3 className="text-center">{title}</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="text-center">
          <img className="mb-4 rounded w-100 img-fluid" src={imageUri} alt="" />
        </div>
        <p>{questionText}</p>
      </div>
    </div>
  );
}

export default QuestionSection;
