const mongoose = require("mongoose");

// Environment Variables
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// App.js
const app = require("./app");

// DB Variable
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Function to Connecting DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// SERVER PORT
const port = process.env.PORT || 3000;

// Connection
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
