import { useEffect, useState } from "react";
import api from "../services/api"; // Import API service for fetching tasks
import BidModal from "../components/BidModal"; // Import BidModal component (ensure this file exists in src/components/)

function TaskList() {
  const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State to track the task selected for bidding
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks"); // API call to get tasks
      setTasks(res.data); // Update tasks state with response data
    } catch (err) {
      console.error("Failed to fetch tasks:", err); // Log error for debugging
      alert("Could not load tasks. Please try again."); // Notify user of error
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>

      {loading ? (
        <p>Loading tasks...</p> // Display while tasks are being fetched
      ) : tasks.length === 0 ? (
        <p>No tasks available right now.</p> // Display if no tasks are found
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id} // Unique key for each task
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">
                📍 {task.location} | 🛠️ {task.category}
              </p>
              <button
                onClick={() => setSelectedTaskId(task.id)} // Open BidModal for this task
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Place Bid
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedTaskId && (
        <BidModal
          taskId={selectedTaskId} // Pass selected task ID to BidModal
          onClose={() => setSelectedTaskId(null)} // Close modal by resetting selectedTaskId
        />
      )}
    </div>
  );
}

export default TaskList;