const Student = require('./../models/studentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Application Logic and HTTP Request

exports.getAllStudent = catchAsync(async (req, res, next) => {
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
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new AppError('No student has found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      student: newStudent,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return next(new AppError('No student has found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student: student,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return next(new AppError('No student has found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
