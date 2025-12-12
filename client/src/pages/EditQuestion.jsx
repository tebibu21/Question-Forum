import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "../styles/EditQuestion.css";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  // Fetch existing question
  useEffect(() => {
    async function loadQuestion() {
      try {
        const { data } = await axios.get(`/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitle(data.title);
        setDescription(data.description);
        setTag(data.tag || "");
      } catch (error) {
        console.log(error.response);
        alert("Failed to load question");
      }
    }

    loadQuestion();
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(
        `/questions/${id}`,
        { title, description, tag },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Question updated successfully");
      navigate(`/question/${id}`);
    } catch (error) {
      console.log(error.response);
      alert("Error updating question");
    }
  }

  return (
    <div className="edit-question-container">
      <h1>Edit Question</h1>

      <form onSubmit={handleSubmit} className="edit-question-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button className="save-btn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditQuestion;
