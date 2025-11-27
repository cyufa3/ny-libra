import React from "react";
import BookCard from "./BookCard";
import "./BookList.css";

const BookList = ({ books }) => {
  // Sort safely without mutating the original books[]
  const sortedBooks = [...books].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="book-list">
      {sortedBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
