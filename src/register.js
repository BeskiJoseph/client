import React, { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./context";
import "./register.css";

export default function Register() {
    const { users, setUsers } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }
        setError('');

        const newUser = { name, email, password, amount: 1000 };

        setLoading(true);

        // Updated backend endpoint for user registration
        axios.post('https://server-sk7t.onrender.com/Create', newUser)
            .then(response => {
                setUsers([...users, response.data]);  // Update the context with the new user
                setName('');
                setEmail('');
                setPassword('');
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError("An error occurred while registering. Please try again.");
                console.error("Error adding user:", error);
            });
    }

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <label>Enter Username:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Username"
                    required
                />

                <label>Enter Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                />

                <label>Enter Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                />

                <button type="submit" className="blue-button" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
