const Student = require('./../models/studentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Application Logic and HTTP Request

exports.getAllStudent = async (req, res) => {
  try {
    //BUILD THE QUERY
    // 1.) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['studentName'];
    console.log(queryObj);
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2.) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Student.find(JSON.parse(queryStr));

    // 3.) Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // // 4.) Limiting Fields
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // Executing the query
    const student = await query;

    // Send Response
    res.status(200).json({
      status: 'success',
      results: student.length,
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        student: student,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
