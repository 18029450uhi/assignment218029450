import QuestionSection from "../components/QuestionSection";
import HintsSection from "../components/HintsSection";
import AnswerSection from "../components/AnswerSection";
import ProfileButton from "../components/ProfileButton";

import { useEffect, useState } from "react";

import { Spinner } from "react-bootstrap";
import { getDatabase, ref, get } from "firebase/database";

function QuestionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const questionRef = ref(getDatabase(), `balances`);
      const snapshot = await get(questionRef);

      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No such document!");
        setData(null);
      }
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updatedData]);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ height: "100vh" }}
      >
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-danger text-center">Firebase error</h1>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3">
        <ProfileButton />
      </div>
      <h1 className="text-center">Question Page</h1>
      <div className="row">
        <QuestionSection quesData={data} />
        <HintsSection quesData={data} />
      </div>
      <div className="row">
        {data && (
          <AnswerSection
            quesData={data}
            setUpdatedData={setUpdatedData}
            updatedData={updatedData}
          />
        )}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </div>
  );
}
export default QuestionPage;
