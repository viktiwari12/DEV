const express = require("express");

const app = express();

// DB
const BOOK_STORE = [];

// Middlewares / Plug in
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "Hello from Server" });
});

app.get("/books", (req, res) => {
  return res.json({ data: BOOK_STORE });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = BOOK_STORE.find((e) => e.id == id);

  if (!book)
    return res.status(404).json({ error: `Book with id ${id} not found` });

  return res.json({ book });
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = BOOK_STORE.findIndex((e) => e.id == id);

  if (bookIndex === -1)
    return res.status(404).json({ error: `Book with id ${id} not found` });

  BOOK_STORE.splice(bookIndex, 1);

  return res.json({ status: "deleted" });
});

app.patch("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;

  const bookIndex = BOOK_STORE.findIndex((e) => e.id == id);

  if (bookIndex === -1)
    return res.status(404).json({ error: `Book with id ${id} not found` });

  const updatedBook = BOOK_STORE[bookIndex];

  if (title) updatedBook.title = title;

  if (price) updatedBook.price = price;

  BOOK_STORE[bookIndex] = updatedBook;

  return res.json({ status: "updated" });
});

app.post("/books", (req, res) => {
  const id = BOOK_STORE.length + 1;
  const { title, price } = req.body;

  if (!title || typeof title !== "string" || title.length < 3)
    return res
      .status(400)
      .json({ error: "Title is required and must be 3 chars long" });

  if (!price || typeof price !== "number" || price < 0)
    return res.status(400).json({ error: "Price is required as a +ve int" });

  const book = { id, title, price };
  BOOK_STORE.push(book);

  return res.status(201).json({ status: "created", data: { id } });
});

app.listen(8000, () => console.log(`Server running on PORT:8000`));

/** Book Store
 * GET /books Done
 * GET /books/1
 * POST /books  Done
 * DELETE /books/1
 * Book {
 *  id
 *  title
 *  price
 * }
 */
