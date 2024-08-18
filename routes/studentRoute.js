const express = require("express");
const studentController = require("./../controllers/studentController");

const router = express.Router();

// router.param("id", studentController.checkID);

router
  .route("/")
  .get(studentController.getAllStudent)
  .post(studentController.checkBody, studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
