const express = require("express");
const studentController = require("./../controllers/studentController");

const router = express.Router();

router
  .route("/")
  .get(studentController.getStudent)
  .post(studentController.createStudent)
  .update(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
