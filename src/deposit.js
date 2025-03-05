import { useState } from "react";
import axios from "axios";
import "./Deposit.css";

export default function Deposit() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleDeposit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        axios.post("https://server-11qa.onrender.com/deposit", { name: username, email, password, amount })
            .then(response => {
                if (response.data.success) {
                    setSuccess(`Deposit successful! New balance: ₹${response.data.newBalance}`);
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                setError("Enter Valid Details!");
                console.error(error);
            });
    }

    return (
        <div className="deposit-container">
            <h1>Deposit Money</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="deposit-form" onSubmit={handleDeposit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value) } placeholder="Enter Username"required />

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Enter Password" required />

                <label>Deposit Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Deposit Amount"required />

                <button type="submit" className="blue-button">Deposit</button>

            </form>
        </div>
    );
}
