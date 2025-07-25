import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "", email: "", password: "", role: "VILLAGER",
    phoneNumber: "", location: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", user);
      alert("Registered successfully. Now login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Name" onChange={(e) => setUser({...user, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})} />
      <input placeholder="Phone" onChange={(e) => setUser({...user, phoneNumber: e.target.value})} />
      <input placeholder="Location" onChange={(e) => setUser({...user, location: e.target.value})} />
      <select onChange={(e) => setUser({...user, role: e.target.value})}>
        <option value="VILLAGER">Villager</option>
        <option value="WORKER">Worker</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
