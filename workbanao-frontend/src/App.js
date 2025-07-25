import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
