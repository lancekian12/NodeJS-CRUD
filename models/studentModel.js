const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A student should have first name'],
    maxlength: [
      50,
      'A student first name must have less or equal than 50 characters',
    ],
    minlength: [
      6,
      'A student first name must have more or equal than 10 characters',
    ],
  },
  lastName: {
    type: String,
    required: [true, 'A student should have last name'],
    maxlength: [
      50,
      'A student last name must have less or equal than 50 characters',
    ],
    minlength: [
      6,
      'A student last name must have more or equal than 10 characters',
    ],
  },
  course: {
    type: String,
    required: [true, 'A student should have a course'],
    maxlength: [
      50,
      'A student course must have less or equal than 50 characters',
    ],
    minlength: [
      6,
      'A student last name must have more or equal than 10 characters',
    ],
  },
  year: {
    type: String,
    required: [true, 'A student should have a year'],
    maxlength: [
      50,
      'A student year must have less or equal than 50 characters',
    ],
  },
  enrolled: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Student = mongoose.model('Students', studentSchema);

module.exports = Student;
