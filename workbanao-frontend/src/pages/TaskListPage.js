import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/taskService';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log("Fetched Tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="p-3 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Location: {task.location}</p>
            <p className="text-sm text-gray-500">Posted By: {task.postedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListPage;
