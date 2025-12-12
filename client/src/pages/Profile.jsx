import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import axios from "../axiosConfig";
import "../styles/Profile.css";

function Profile() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: userQuestions } = await axios.get(
          `/questions/user/${user.userid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(userQuestions);

        const { data: userAnswers } = await axios.get(
          `/answers/user/${user.userid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnswers(userAnswers);
      } catch (error) {
        console.log(error.response);
      }
    }

    if (user && user.userid) fetchData();
  }, [user]);

  if (!user || !user.userid) {
    return (
      <div className="profile-container">
        <h2>Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.username}</h1>
        <p className="profile-email">{user.email}</p>
      </div>

      {/* QUESTIONS SECTION */}
      <div className="section">
        <h2>Your Questions</h2>
        {questions.length === 0 && (
          <p className="empty-text">No questions posted.</p>
        )}

        {questions.map((q) => (
          <div key={q.questionid} className="card">
            <h3>{q.title}</h3>
            <p>{q.description}</p>
          </div>
        ))}
      </div>

      {/* ANSWERS SECTION */}
      <div className="section">
        <h2>Your Answers</h2>
        {answers.length === 0 && (
          <p className="empty-text">No answers submitted.</p>
        )}

        {answers.map((a) => (
          <div key={a.answerid} className="card answer-card">
            <p className="answer-text">{a.answer}</p>
            {/* <span className="answer-question">Question : {}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
