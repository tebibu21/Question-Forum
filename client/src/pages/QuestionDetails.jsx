import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../axiosConfig";
import "../styles/QuestionDetails.css";
import Loading from "../components/Loading";

function AnswerCard({ answer, username }) {
  return (
    <div className="answer-card">
      <div className="answer-user-info">
        <div className="user-icon"></div>
        <p className="answer-username">{username}</p>
      </div>
      <div className="answer-text-content">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function QuestionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppState);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

  const token = localStorage.getItem("token");
console.log("Question to delete:", question);
console.log("Token:", token);

  // Fetch question + answers
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await axios.get(`/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setQuestion(data);
      } catch (error) {
        console.log(error.response);
      }
    }

    async function fetchAnswers() {
      try {
        const { data } = await axios.get(`/answers/question/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAnswers(data);
      } catch (error) {
        console.log(error.response);
      }
    }

    fetchQuestion();
    fetchAnswers();
  }, [id, token]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      await axios.delete(`/questions/${question.questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Question deleted");
      navigate("/");
    } catch (error) {
      console.log(error.response);
      alert("Error deleting question");
      console.log("Deleting question:", question);
    }
  }

  function handleEdit() {
    navigate(`/edit-question/${question.questionid}`);
  }

  async function handleAnswerSubmit(e) {
    e.preventDefault();
    if (!answerText.trim()) return alert("Answer cannot be empty.");

    try {
      await axios.post(
        "/answers/create",
        { answer: answerText, questionid: question.questionid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnswers([...answers, { answer: answerText, username: user.username }]);

      setAnswerText("");
    } catch (error) {
      console.log(error.response);
      alert("Error posting answer");
    }
  }

  if (!question) return <Loading />;

  return (
    <div className="question-details-container">
      {/* Question section */}
      <div className="question-section">
        <h2 className="section-title">Question</h2>
        <h1 className="question-title">{question.title}</h1>
        <p className="question-description">{question.description}</p>
        {/* Show ONLY if user is owner */}
        {user?.userid === question.userid && (
          <div className="button-container">
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
        <hr className="divider" />
      </div>

      {/* Answers section */}
      <div className="answers-section">
        <h3 className="answers-header">Answers From The Community</h3>

        {answers.length === 0 && <p>No answers yet.</p>}

        <div className="answers-list">
          {answers.map((ans, idx) => (
            <AnswerCard key={idx} answer={ans.answer} username={ans.username} />
          ))}
        </div>
      </div>

      {/* Answer form */}
      <div className="answer-form-section">
        <h3 className="answer-form-header">Post Your Answer</h3>

        <form onSubmit={handleAnswerSubmit}>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="answer-textarea"
            placeholder="Write your answer..."
          ></textarea>

          <button type="submit" className="post-answer-button">
            Post Answer
          </button>
        </form>

        <Link to="/" className="link-text">
          Back to Questions
        </Link>
      </div>
    </div>
  );
}

export default QuestionDetails;
