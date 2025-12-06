// db connection
const dbConnection = require("../db/dbConfig");

function createAnswer(req, res) {
  res.send("create answer");
}

function getAnswerForAll(req, res) {
  res.send("answers for a question");
}

function getAnswerByUser(req, res) {
  res.send("answers by user");
}

module.exports = {
  createAnswer,
  getAnswerForAll,
  getAnswerByUser,
};
