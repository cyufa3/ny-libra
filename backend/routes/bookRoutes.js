import express from "express";
import Book from "../models/Book.js";

const router = express.Router();
// GET all books or by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category; // exact match
    }

    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Search books by title, author, or ref
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    // Case-insensitive partial match on multiple fields
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { auteur: { $regex: query, $options: "i" } },
        { ref: { $regex: query, $options: "i" } },
      ],
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ Get all categories

router.get("/categories", async (req, res) => {
  try {
    // Return only unique categories
    const categories = await Book.distinct("category");  // ← use distinct
    res.json(categories); // array of strings
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// ✅ Get a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new book
router.post("/", async (req, res) => {
  const { auteur, title, ref, image } = req.body;
  try {
    const newBook = new Book({ auteur, title, ref, image });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update a book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete a book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    const savedMessage = await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!", data: savedMessage });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
