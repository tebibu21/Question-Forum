const express = require("express");
const router = express.Router();

// answer controllers
const {createAnswer, getAnswerForAll, getAnswerByUser } = require("../controller/answerController")

// create answer
router.post("/create", createAnswer);

// get all answers for a question
router.get("/question/:id", getAnswerForAll);

// get answers by user
router.get("/user/:userid", getAnswerByUser);

module.exports = router;
