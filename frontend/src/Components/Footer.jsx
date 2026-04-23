import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Ny-Labra Library Catalogue — All rights reserved.
      </p>
      <p className="footer-subtext">
        Made with ❤️ by Cyuzuzo Fabrice
      </p>
    </footer>
  );
};

export default Footer;
