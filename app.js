const express = require("express");
const morgan = require("morgan");
// const hpp = require("hpp");

const app = express();
const studentRouter = require("./routes/studentRoute");

// 1. Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Hello from the server 👋");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3.) ROUTES
app.use("/api/v1/student", studentRouter);

// 4.) START SERVER
module.exports = app;
