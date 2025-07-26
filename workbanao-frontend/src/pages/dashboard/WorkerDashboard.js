import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUserId } from "../../utils/auth";

function WorkerDashboard() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const load = async () => {
      const workerId = getUserId();
      const res = await api.get(`/bids/worker/${workerId}`);
      setBids(res.data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>
      <ul className="space-y-4">
        {bids.map((bid) => (
          <li key={bid.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{bid.task?.title || "Task Title"}</p>
            <p>Amount: ₹{bid.bidAmount}</p>
            <p>Message: {bid.message || "No message"}</p>
            <p>Status: <b>{bid.status}</b></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerDashboard;
