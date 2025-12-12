import { useState } from "react";
import axios from "../axiosConfig";
import "../styles/AskQuestion.css"; // 👈 Import the new CSS file
import { useNavigate } from "react-router-dom";


function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(""); // The tag field seems hidden in the image, I'll keep it functional but remove the input field from the visual render to match the image, or merge it with description.

  // NOTE: The image only shows 'Title' and 'Question Description'.
  // I will keep the 'tag' state and logic but omit the input field from the UI
  // to match the image precisely. If 'tag' is mandatory, the backend will still receive it as an empty string.

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Check if required fields are filled (Title and Description)
    if (!title || !description) {
      alert("Please provide both a Title and a Description for your question.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/questions/create",
        {
          title,
          description,
          tag, // tag is still sent to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Question posted!");
      console.log(data);
      navigate("/");
      // Optional: Clear form after successful post
      setTitle("");
      setDescription("");
      setTag("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(
        "Error posting question: " +
          (error.response?.data?.msg || "Unknown error")
      );
    }

  }

  return (
    <div className="ask-question-container">
      {/* --- Steps to write a good question section --- */}
      <div className="steps-section">
        <h2 className="steps-title">Steps to write a good question</h2>
        <ul className="steps-list">
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {/* --- Ask a public question form area --- */}
      <div className="form-wrapper">
        <h3 className="form-area-title">Ask a public question</h3>
        <p className="go-to-link">
          <a href="/" className="link-text">
            Go to Question page
          </a>
        </p>

        <form onSubmit={handleSubmit} className="ask-form">
          {/* Title Input */}
          <input
            className="title-input"
            type="text" // Explicitly setting type
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required // Making it required as per the steps
          />

          {/* Description Textarea */}
          <textarea
            className="description-textarea"
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required // Making it required as per the steps
          />

          {/* Tag input is removed from UI to match the image, but kept in state/logic */}

          <button type="submit" className="post-button">
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
