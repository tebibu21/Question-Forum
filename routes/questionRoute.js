const express = require("express");
const router = express.Router();


// question controllers
const {
  createQuestion,
  getQuestion,
  getQuestionById,
  getQuestionByUser,
  deleteQuestion,
  updateQuestion
} = require("../controller/questionController");

// create question
router.post("/create", createQuestion);

// get all questions
router.get("/",getQuestion);

// get questions by a specific user
router.get("/user/:userid", getQuestionByUser);

// get one question
router.get("/:id", getQuestionById);

// DELETE a question
router.delete("/:id", deleteQuestion);

// UPDATE a question
router.put("/:id", updateQuestion);

module.exports = router;
