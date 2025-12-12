import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import axios from "../axiosConfig";
import QuestionCard from "../components/QuestionCard";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; // 👈 Import the new CSS file

function Home() {
  const { user, setUser } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch user info & questions
  async function initialize() {
    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }

    try {
      // Check user
      const { data: userData } = await axios.get("/users/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        username: userData.username,
        userid: userData.userid,
      });


      // Fetch questions
      const { data: questionsData } = await axios.get("/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questionsData);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        {user?.userid && (
          <Link to="/ask" className="ask-button-link">
            <button className="ask-button">Ask Question</button>
          </Link>
        )}
        {user?.username && (
          <h2 className="welcome-message">Welcome: {user?.username}</h2>
        )}
      </div>

      <h3 className="questions-section">Questions</h3>

      {loading ? (
        <Loading />
      ) : (
        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((q) => <QuestionCard key={q.id} question={q} />)
          ) : (
            <p>No questions yet. Be the first to ask!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
