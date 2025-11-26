import { useEffect, useState } from "react";
import BookList from "../BookList";
import Sidebar from "../Sidebar"; // ADD THIS LINE
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Fetch all categories
  useEffect(() => {
    fetch("https://ny-libra.onrender.com/api/books/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleCategoryClick = (category) => {
    setLoading(true);
    fetch(`https://ny-libra.onrender.com/api/books?category=${encodeURIComponent(category)}`)
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
    <div style={{ display: "flex" }}>
      
      {/* LEFT SIDEBAR */}

      <div className={showSidebar ? "sidebar1 visible" : "sidebar1 hidden"}>
      <Sidebar categories={categories} onSelect={handleCategoryClick} />

      </div>
      
      {/* MAIN CONTENT */}
      <div className="categories-container" style={{ marginRight: "200px", width: "100%" }}>
        <h2>Categories</h2>

        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="categories-buttons">
            {/* KEEP BUTTON LIST HERE */}
            {categories.map((cat, index) => (
              <button key={index} onClick={() => handleCategoryClick(cat)}>
                {cat}
              </button>
            ))}
          </div>
        )}

        <h3 style={{ marginTop: "30px", textAlign: "center" }}>
          Books in selected category
        </h3>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading books...</p>
        ) : (
          <BookList books={books} />
        )}
      </div>
    </div>
  );
}

export default Categories;
