import React from "react";
import "./Footer.css"; // Import CSS for styling

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Bad Bank. All rights reserved.</p>
    </footer>
  );
}
