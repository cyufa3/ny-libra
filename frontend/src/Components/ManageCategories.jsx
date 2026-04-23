import { useEffect, useState } from "react";
import "./ManageCategories.css";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");

  // Fetch categories
  const fetchCategories = () => {
    fetch("https://ny-libra.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category
  const handleAdd = (e) => {
    e.preventDefault();

    fetch("https://ny-libra.onrender.com/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Category added successfully!");
        setNewCategory("");
        fetchCategories();
      })
      .catch(() => setMessage("Error adding category."));
  };

  // Delete Category
  const handleDelete = (id) => {
    fetch(`https://ny-libra.onrender.com/api/categories/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMessage("Category deleted!");
        fetchCategories();
      })
      .catch(() => setMessage("Error deleting category."));
  };

  return (
    <div className="manage-cat-container">
      <h1>Manage Categories</h1>

      {message && <p className="cat-message">{message}</p>}

      {/* Add Form */}
      <form className="cat-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Categories List */}
      <div className="cat-list">
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((cat) => (
            <div className="cat-item" key={cat._id}>
              <span>{cat.name}</span>
              <button onClick={() => handleDelete(cat._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageCategories;
