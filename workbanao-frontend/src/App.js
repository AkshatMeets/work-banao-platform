import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import VillagerDashboard from "./pages/dashboard/VillagerDashboard";
import WorkerDashboard from "./pages/dashboard/WorkerDashboard";
import './services/api'; // this triggers token initialization early

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/dashboard/villager" element={<VillagerDashboard />} />
        <Route path="/dashboard/worker" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
