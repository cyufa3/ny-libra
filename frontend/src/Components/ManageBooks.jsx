import { useEffect, useState } from "react";
import "./ManageBooks.css";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all books on page load
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Delete a book
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((err) => console.error("Error deleting book:", err));
  };

  if (loading) return <p className="loading">Loading books...</p>;

  return (
    <div className="manage-books-container">
      <h1>Manage Books</h1>

      {books.length === 0 ? (
        <p className="no-books">No books found.</p>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td className="desc">
                  {book.description?.substring(0, 50)}...
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(book._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBooks;
