const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    maxlength: [
      50,
      "A student name must have less or equal than 40 characters",
    ],
    minlength: [
      20,
      "A student name must have less or equal than 10 characters",
    ],
  },
  age: {
    type: Number,
    required: [true, "A student should have age"],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
