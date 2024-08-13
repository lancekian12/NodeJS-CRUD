const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsync");

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });

  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tour
  //   }
  // });
});

exports.createStudent = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    const newStudent = await Student.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
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
      status: "success",
      data: {
        tour: "<Updated> tour here... ",
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

exports.deleteStudent = (req, res) => {
  console.log(req.params);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
