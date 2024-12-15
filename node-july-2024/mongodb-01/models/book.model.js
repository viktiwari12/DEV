const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true, // Applicatin Level Validation
      unique: true, // Db Level Constraint
    },
    publisher: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = model("book", bookSchema);

module.exports = Book; // Default Export
