import React from 'react'
import { useEffect, useState } from "react";
import BookList from "../BookList"
import SearchBar from '../SearchBar';


function Home() {
 const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all books initially
 const fetchBooks = () => {
  setLoading(true);
  fetch("http://localhost:5000/api/books")
    .then((res) => res.json())
    .then((data) => {
      // Shuffle + pick 20 random
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

  
  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchBooks(); // reload all books if search box is empty
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/api/books/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
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
  )
}

export default Home
