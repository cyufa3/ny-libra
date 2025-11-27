import { useEffect, useState } from "react";
import BookList from "../BookList";
import Sidebar from "../Sidebar";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(false); // reset on desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll behavior for large screens
  useEffect(() => {
    if (isMobile) return; // skip on mobile

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Fetch categories
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
    setShowSidebar(false);


    fetch(
      `https://ny-libra.onrender.com/api/books?category=${encodeURIComponent(
        category
      )}`
    )
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
    <div className="categories-page" style={{ display: "flex" }}>
      {/* Sidebar toggle button for mobile */}
      {isMobile && (
        <button
          className="sidebar-toggle-btn"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? "Hide Categories" : "Show Categories"}
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar1 ${showSidebar ? "visible" : "hidden"}`}>
        <Sidebar categories={categories} onSelect={handleCategoryClick} />
      </div>

      {/* Main content */}
      <div className="categories-container" style={{ width: "100%", marginRight: "200px" }}>
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
