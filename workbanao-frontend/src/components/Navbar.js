import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <h2>Work Banao</h2>
      <div>
        <Link to="/" style={{ marginRight: "15px", color: "white" }}>Home</Link>
        <Link to="/tasks" style={{ marginRight: "15px", color: "white" }}>Tasks</Link>
        <Link to="/create-task" style={{ color: "white" }}>Post Task</Link>
      </div>
    </nav>
  );
};

export default Navbar;
