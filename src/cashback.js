import { useState } from "react";
import axios from "axios";
import "./cashback.css";

export default function Cashback() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [amount, setAmount] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    function handleWithdraw(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Ensure the withdrawal amount is a valid positive number
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            setError("Please enter a valid positive withdrawal amount.");
            return;
        }

        // Make the API request to process the withdrawal
        axios.post("https://server-sk7t.onrender.com/withdraw", { name: username, email, password, amount: withdrawAmount })
            .then(response => {
                if (response.data.success) {
                    setSuccess(`Withdrawal successful! New balance: ₹${response.data.newBalance}`);
                } else {
                    setError(response.data.message || "An error occurred during withdrawal.");
                }
            })
            .catch(error => {
                setError("Error processing the withdrawal. Please try again.");
                console.error(error);
            });
    }

    return (
        <div className="withdraw-container">
            <h1>Withdraw Money</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="withdraw-form" onSubmit={handleWithdraw}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Withdraw Amount:</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    min="1" 
                />

                <button type="submit" className="blue-button">Withdraw</button>
            </form>
        </div>
    );
}
