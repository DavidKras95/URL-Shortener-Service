require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/routes");

const app = express();

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", userRoutes);
app.use(express.static("public")); // Serve static files from the public directory

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/view/view.html"); // Serve the view.html file
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
