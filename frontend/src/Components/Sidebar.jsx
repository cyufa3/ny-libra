import React from "react";
import "./Sidebar.css";

function Sidebar({ categories, onSelect }) {
  return (
    <div className="sidebar1">
      <h3>Categories</h3>
      <ul>
        {categories.map((cat, index) => (
          <li key={index} onClick={() => onSelect(cat)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
