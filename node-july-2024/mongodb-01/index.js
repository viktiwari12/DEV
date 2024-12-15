const express = require("express");
const mongoose = require("mongoose");

const Book = require("./models/book.model");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://piyushgargdev:7ytjQRjV9kQ65kyt@cluster0.xpynasy.mongodb.net/book_store?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.error(`Error Connecting MongoDB`, err));

app.get("/", (req, res) => {
  return res.json({ message: "Server is up and running" });
});

app.get("/books", async (req, res) => {
  const books = await Book.find({});
  return res.json({ books });
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  return res.json({ book });
});

app.post("/books", async (req, res) => {
  const { title, price, author } = req.body;

  const book = await Book.create({ title, price, author });
  return res.json({ book });
});

app.listen(8000, () => console.log(`Server is running on PORT 8000`));
