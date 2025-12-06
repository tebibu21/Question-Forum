// db connection
const dbConnection = require("../db/dbConfig");

function createQuestion(req, res) {
  res.send("create question");
}

function getQuestion(req, res) {
  res.send("get all questions");
}

function getQuestionById(req, res) {
  res.send("get a question by id");
}

function getQuestionByUser(req, res) {
  res.send("get questions asked by user");
}

function deleteQuestion(req, res) {
  const questionId = req.params.id;
  res.send(`delete question with id ${questionId}`);
}

function updateQuestion(req, res) {
  const questionId = req.params.id;
  res.send(`update question with id ${questionId}`);
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestionById,
  getQuestionByUser,
  deleteQuestion,
  updateQuestion,
};
