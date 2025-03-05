import React, { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./context";
import "./register.css";

export default function Register() {
    const { users, setUsers } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            setMessage("All fields are required!");
            return;
        }
        setMessage('');

        let newUser = { name, email, password, amount: 1000 };

        axios.post('https://server-11qa.onrender.com/Create', { name, email, password })
        .then(response => {
            console.log("Server response:", response.data);
            setMessage(response.data.message);
        })
        .catch(error => {
            console.error("Error creating account:", error);
            setMessage("Error creating account. Please try again.");
        });
    }    

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
            {message && (
    <p className={message.includes("successfully") ? "success-message" : "error-message"}>
        {message}
    </p>
)}

                <label>Enter Username:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Username" required />

                <label>Enter Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />

                <label>Enter Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />

                <button type="submit" className="blue-button">Submit</button>
            </form>
        </div>
    );
}