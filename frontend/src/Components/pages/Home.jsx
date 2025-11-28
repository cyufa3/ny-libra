import React from 'react'
import { useEffect, useState } from "react";
import BookList from "../BookList";
import SearchBar from "../SearchBar";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch ALL books, then pick 20 random
  const fetchBooks = () => {
    setLoading(true);

    fetch("https://ny-libra.onrender.com/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Books data is not an array:", data);
          return;
        }

        // Shuffle & pick 20 random
        const random20 = data
          .sort(() => Math.random() - 0.5)
          .slice(0, 20);

        setBooks(random20);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // SEARCH HANDLER
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchBooks(); // reload random 20
      return;
    }

    setLoading(true);

    fetch(`https://ny-libra.onrender.com/api/books/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure search result is always an array
        if (Array.isArray(data)) {
          setBooks(data);   // show ALL matched books
        } else if (data.results && Array.isArray(data.results)) {
          setBooks(data.results);
        } else {
          setBooks([]); // no results
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error searching books:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        📚 Ny-Labra Library Catalogue
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading books...</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}

export default Home;
