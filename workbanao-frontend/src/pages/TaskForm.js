import { useState } from "react";
import api from "../services/api";
import { getUserId } from "../utils/auth";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    location: ""
  });

  const handleCreate = async () => {
    const userId = getUserId();
    if (!userId) return alert("Please login");

    try {
      await api.post(`/tasks/create/${userId}`, task);
      alert("Task posted successfully!");
      setTask({ title: "", description: "", category: "", location: "" }); // Reset form
    } catch {
      alert("Task posting failed.");
    }
  };

  return (
    <div className="p-4">
      <input
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        placeholder="Category"
        value={task.category}
        onChange={(e) => setTask({ ...task, category: e.target.value })}
      />
      <input
        placeholder="Location"
        value={task.location}
        onChange={(e) => setTask({ ...task, location: e.target.value })}
      />
      <button onClick={handleCreate}>Post Task</button>
    </div>
  );
}

export default TaskForm;