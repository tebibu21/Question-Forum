import { Link } from "react-router-dom";

function QuestionCard({ question }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <h3>
        <Link to={`/question/${question.questionid}`}>{question.title}</Link>
      </h3>
      <p>{question.description}</p>
      <small>Asked by: {question.username}</small>
    </div>
  );
}

export default QuestionCard;
