function AnswerCard({ answer }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      <p>{answer.answer}</p>
      <small>Answered by: {answer.username}</small>
    </div>
  );
}

export default AnswerCard;
