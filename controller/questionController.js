// db connection
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

async function createQuestion(req, res) {
  const { title, description, tag } = req.body; // <-- FIXED
  const userid = req.user.userid;

  if (!title || !description) {
    return res.status(400).json({ msg: "Please provide title & description" });
  }

  const questionid = uuidv4();

  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?,?,?,?,?)",
      [questionid, title, description, tag || null, userid] // <-- FIXED
    );

    res.status(201).json({ msg: "Question created successfully", questionid });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getQuestion(req, res) {
  try {
    const [rows] = await dbConnection.query(
      `SELECT q.id, q.questionid, q.title, q.description, q.tag, 
              u.username 
       FROM questions q 
       JOIN users u ON q.userid = u.userid 
       ORDER BY q.id DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getQuestionById(req, res) {
  const questionId = req.params.id; // <-- FIXED

  try {
    const [rows] = await dbConnection.query(
      `SELECT q.id, q.questionid, q.title, q.description, q.tag, q.userid, u.username
       FROM questions q 
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [questionId] // <-- FIXED
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getQuestionByUser(req, res) {
  const userid = req.params.userid;

  try {
    const [rows] = await dbConnection.query(
      `SELECT * FROM questions WHERE userid = ? ORDER BY id DESC`,
      [userid]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function deleteQuestion(req, res) {
  const questionId = req.params.id;
  const userid = req.user.userid;

  try {
    const [rows] = await dbConnection.query(
      "SELECT userid FROM questions WHERE questionid = ?",
      [questionId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    if (rows[0].userid !== userid) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await dbConnection.query("DELETE FROM questions WHERE questionid = ?", [
      questionId,
    ]);

    res.json({ msg: "Question deleted successfully" });
  } catch (error) {
    console.log("DELETE question error:", error); // 👈 Log the real error
    res.status(500).json({ msg: error.message });
  }
}


async function updateQuestion(req, res) {
  const questionId = req.params.id;
  const { title, description, tag } = req.body;
  const userid = req.user.userid;

  try {
    const [rows] = await dbConnection.query(
      "SELECT userid FROM questions WHERE questionid = ?",
      [questionId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    if (rows[0].userid !== userid) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await dbConnection.query(
      "UPDATE questions SET title=?, description=?, tag=? WHERE questionid=?",
      [title, description, tag, questionId]
    );

    res.json({ msg: "Question updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}


module.exports = {
  createQuestion,
  getQuestion,
  getQuestionById,
  getQuestionByUser,
  deleteQuestion,
  updateQuestion,
};
