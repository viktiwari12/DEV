const express = require("express");
const mongoose = require("mongoose");

// Middlewares
const { ensureAuthenticated } = require("./middlewares/auth.middleware");

// Routes
const userRouter = require("./routes/user.route");

mongoose
  .connect(
    "mongodb+srv://piyushgargdev:7ytjQRjV9kQ65kyt@cluster0.xpynasy.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log(`MongoDB Connection is Success!`))
  .catch((err) => {
    console.log("MongoDB Connection Failed");
    throw err;
  });

// Constants
const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "success" });
});

app.use("/users", userRouter);

// Config
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
