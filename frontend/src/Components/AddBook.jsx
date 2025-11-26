import { useEffect, useState } from "react";
import "./AddBook.css";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load categories from backend
  useEffect(() => {
    fetch("https://ny-libra.onrender.com/api/books/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    fetch("https://ny-libra.onrender.com/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error saving book");
        return res.json();
      })
      .then(()=> {
        setMessage("Book added successfully!");
        setFormData({
          title: "",
          author: "",
          category: "",
          description: "",
          image: "",
        });
      })
      .catch((err) => {
        setError("Error adding book. Try again.");
        console.error(err);
      });
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="add-book-form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        {/* Category dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />

        {/* Auto Preview Image */}
        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="image-preview"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
