import { useEffect, useState } from "react";
import BookList from "../BookList";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all categories on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/books/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // Fetch books when a category button is clicked
  const handleCategoryClick = (category) => {
    setLoading(true);
    fetch(`http://localhost:5000/api/books?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books by category:", err);
        setLoading(false);
      });
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="categories-buttons">
          {categories.map((cat, index) => (
            <button key={index} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </button>
          ))}
        </div>
      )}

      <h3 style={{ marginTop: "30px", textAlign: "center" }}>Books in selected category</h3>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading books...</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}

export default Categories;
