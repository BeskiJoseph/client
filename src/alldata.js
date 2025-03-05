import axios from "axios";
import { useState } from "react";
import "./alldata";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";



export default function Alldata() {
    let [data, setData] = useState([]);
    let [editUser, setEditUser] = useState(null);
    let [updatedUser, setUpdatedUser] = useState({ name: "", email: "", password: "", amount: "" });

    // Fetch user data from backend
    async function handleClick(e) {
        e.preventDefault();
        try {
            let result = await axios.get("https://server-11qa.onrender.com/data");
            setData(result.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    // Delete a user
    async function handleDelete(userId) {
      try {
          let response = await axios.delete(`https://server-11qa.onrender.com/delete/${userId}`);
          if (response.data.success) {
              setData(data.filter(user => user._id !== userId)); // Remove user from UI
          }
      } catch (error) {
          console.error("Error deleting user:", error);
      }
  }
  
  

    // Show the edit form with selected user details
    function handleEdit(user) {
        setEditUser(user);
        setUpdatedUser(user);
    }

    // Handle updating the user in the database
    async function handleUpdate(e) {
        e.preventDefault();
        try {
            let response = await axios.put(`https://server-11qa.onrender.com/update/${editUser.email}`, updatedUser);
            if (response.data.success) {
                setData(data.map(user => user.email === editUser.email ? updatedUser : user));
                setEditUser(null);
            }
        } catch (error) {
            console.error("Error updating user", error);
        }
    }

    return (
        <div className="data-container">
            <h1>ALL DATA</h1>
            <button onClick={handleClick} className="blue-button">FETCH</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>E-MAIL</th>
                        <th>PASSWORD</th>
                        <th>AMOUNT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.email}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.amount}</td>
                            <td className="action-buttons">
    <button className="blue-button" onClick={() => handleDelete(item._id)}><MdDelete /></button>
    <button className="blue-button" onClick={() => handleEdit(item)}><TiEdit /></button>
</td>


                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Form Appears Below */}
            {editUser && (
                <div className="edit-form">
                    <h2>Edit User</h2>
                    <form onSubmit={handleUpdate}>
                        <label>Name:</label>
                        <input type="text" value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} required />

                        <label>Password:</label>
                        <input type="text" value={updatedUser.password} onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })} required />

                        <label>Amount:</label>
                        <input type="number" value={updatedUser.amount} onChange={(e) => setUpdatedUser({ ...updatedUser, amount: e.target.value })} required />

                        <button type="submit" className="blue-button">Update</button>
                        <button onClick={() => setEditUser(null)} className="blue-button">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
