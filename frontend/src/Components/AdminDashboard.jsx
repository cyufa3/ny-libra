import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Fetch total books
    fetch("https://ny-libra.onrender.com/api/books/count")
      .then((res) => res.json())
      .then((data) => setTotalBooks(data.count))
      .catch((err) => console.error("Error loading book count:", err));

    // Fetch total categories
    fetch("https://ny-libra.onrender.com/api/books/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTotalCategories(data.length);
      })
      .catch((err) => console.error("Error loading category count:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalBooks}</h2>
          <p>Total Books</p>
        </div>

        <div className="stat-card">
          <h2>{totalCategories}</h2>
          <p>Total Categories</p>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => (window.location.href = "/add-book")}>
          ➕ Add New Book
        </button>

        <button onClick={() => (window.location.href = "/manage-books")}>
          📚 Manage Books
        </button>

        <button onClick={() => (window.location.href = "/manage-categories")}>
          🗂️ Manage Categories
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
