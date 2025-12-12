// db connection
const dbConnection = require("../db/dbConfig");

async function createAnswer(req, res) {
  const { answer, questionid, tag } = req.body;
  const userid = req.user.userid;

  if (!answer || !questionid) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (answer, questionid, userid) VALUES (?,?,?)",
      [answer, questionid, userid]
    );

    res.status(201).json({ msg: "Answer submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getAnswerForAll(req, res) {
  const questionid = req.params.id;

  try {
    const [rows] = await dbConnection.query(
      `SELECT a.answer, u.username 
       FROM answers a 
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.answerid DESC`,
      [questionid]
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getAnswerByUser(req, res) {
  const userid = req.params.userid;

  try {
    const [rows] = await dbConnection.query(
      `SELECT * FROM answers WHERE userid = ? ORDER BY answerid DESC`,
      [userid]
    );

    res.json(rows);
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
  createAnswer,
  getAnswerForAll,
  getAnswerByUser,
};
