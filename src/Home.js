import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css"; // Import CSS file

export default function Home() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="header">
        <h1>Welcome to Bad Bank</h1>
      </div>

      {/* Special Offer Marquee */}
      <div className="special-offer">
        <marquee behavior="scroll" direction="left" scrollamount="7">
          🔥 Special Offer: Earn <span className="highlight">5% cashback</span> on all transactions made with our premium savings account! Limited time only! 🔥
        </marquee>
      </div>

      {/* Main Section */}
      <div className="main-content">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU45BMmNwY4gU5Sau4h0sbVhz0YV_-8oLRSQ&s"
          alt="Bank Image"
          className="bank-image"
        />
        <h2>Experience Modern Banking</h2>
        <p>Join our family today and enjoy secure, fast, and reliable banking services.</p>
        
        {/* Button with onClick to navigate to Register page */}
        <button className="get-started" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

