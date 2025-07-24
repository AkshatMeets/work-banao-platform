import React, { useState } from 'react';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VILLAGER',
    phoneNumber: '',
    location: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered successfully!');
      window.location.href = '/login';
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="VILLAGER">Villager</option>
          <option value="WORKER">Worker</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
