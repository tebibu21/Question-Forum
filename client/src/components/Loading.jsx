function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <div
        className="spinner"
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #ccc",
          borderTop: "5px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <p>Loading...</p>

      <style>
        {`
          @keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

        `}
      </style>
    </div>
  );
}

export default Loading;
