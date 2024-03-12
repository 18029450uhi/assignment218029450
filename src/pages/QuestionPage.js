import QuestionSection from "../components/QuestionSection";
import HintsSection from "../components/HintsSection";
import AnswerSection from "../components/AnswerSection";
import ProfileButton from "../components/ProfileButton";

function QuestionPage() {
  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3">
        <ProfileButton />
      </div>
      <h1 className="text-center">Question Page</h1>
      <div className="row">
        <QuestionSection />
        <HintsSection />
      </div>
      <div className="row">
        <AnswerSection />
      </div>
    </div>
  );
}
export default QuestionPage;
