import React from "react";
import "./BookCard.css";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      
    
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">Author: {book.auteur}</p>
        <p className="book-ref">Ref: {book.ref}</p>
        
      </div>
    </div>
  );
};

export default BookCard;
