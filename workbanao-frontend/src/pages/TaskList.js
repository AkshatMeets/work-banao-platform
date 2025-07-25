import { useEffect, useState } from "react";
import api from "../services/api";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(error => console.error("Failed to fetch tasks:", error));
  }, []);

  return (
    <div className="p-4">
      <h2>All Posted Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.category} - {task.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;