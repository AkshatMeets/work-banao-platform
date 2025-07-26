import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUserId } from "../../utils/auth";

function VillagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [bidsMap, setBidsMap] = useState({}); // { taskId: [bids] }

  const loadData = async () => {
    const userId = getUserId();
    const taskRes = await api.get(`/tasks/byUser/${userId}`);
    setTasks(taskRes.data);

    // Load bids for each task
    const bidsData = {};
    await Promise.all(taskRes.data.map(async (task) => {
      const bidRes = await api.get(`/bids/task/${task.id}`);
      bidsData[task.id] = bidRes.data;
    }));
    setBidsMap(bidsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const acceptBid = async (bidId) => {
    await api.post(`/bids/accept/${bidId}`);
    alert("Bid accepted");
    loadData(); // refresh
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Posted Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} className="border p-4 rounded mb-4">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <h4 className="font-bold mt-2">Bids:</h4>
          <ul>
            {(bidsMap[task.id] || []).map(bid => (
              <li key={bid.id} className="mb-2">
                ₹{bid.bidAmount} – {bid.message || "No message"}
                <span className="ml-2 text-sm text-gray-600">({bid.status})</span>
                {bid.status === "PENDING" && (
                  <button
                    onClick={() => acceptBid(bid.id)}
                    className="ml-4 px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Accept Bid
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VillagerDashboard;
