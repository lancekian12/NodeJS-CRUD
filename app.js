const express = require("express");
// const morgan = require("morgan");
// const hpp = require("hpp");

const app = express();
const studentRouter = require("./routes/studentRoute");

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//3.) ROUTES
app.use("/api/v1/student", studentRouter);

// 4.) START SERVER
module.exports = app;
