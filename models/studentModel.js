const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    maxlength: [
      50,
      'A student name must have less or equal than 50 characters',
    ],
    minlength: [
      10,
      'A student name must have more or equal than 10 characters',
    ],
  },
  age: {
    type: Number,
    required: [true, 'A student should have age'],
  },
  section: {
    type: String,
    required: [true, 'A student should have a section'],
  },
  tuitionFee: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Student = mongoose.model('Students', studentSchema);

module.exports = Student;
