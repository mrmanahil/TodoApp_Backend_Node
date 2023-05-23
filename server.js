require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const todoRoutes = require("./routes/TodoRoutes");

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((e) => {
      console.log("Error connecting to database: ", e);
    });
});
