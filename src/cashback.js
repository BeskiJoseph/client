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

        axios.post("https://server-11qa.onrender.com/withdraw", { name: username, email, password, amount })
            .then(response => {
                if (response.data.success) {
                    setSuccess(`Withdrawal successful! New balance: ₹${response.data.newBalance}`);
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                setError("Enter Valid User Details!");
                
            });
    }

    return (
        <div className="withdraw-container">
            <h1>Withdraw Money</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="withdraw-form" onSubmit={handleWithdraw}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Enter Username" required />

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter Email" required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"required />

                <label>Withdraw Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Withdraw Amount" required />

                <button type="submit" className="blue-button">Withdraw</button>

            </form>
        </div>
    );
}
