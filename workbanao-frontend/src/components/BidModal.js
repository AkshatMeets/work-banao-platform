import { useState } from "react";
import api from "../services/api";
import { getUserId } from "../utils/auth";

function BidModal({ taskId, onClose }) {
  const [bid, setBid] = useState({ bidAmount: "", message: "" });
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async () => {
    setError(""); // Clear previous errors
    const workerId = getUserId();
    if (!workerId) {
      setError("Please log in to place a bid.");
      return;
    }

    try {
      await api.post(`/bids/place/${taskId}/${workerId}`, bid, {
        headers: { "X-Skip-Redirect": "true" }, // Custom header to skip redirect
      });
      alert("Bid submitted successfully!");
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Bid submission failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("Please log in to place a bid.");
      } else {
        setError(err.response?.data?.message || "Failed to submit bid. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h3 className="text-xl font-bold mb-2">Place Bid</h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="number"
          placeholder="Bid Amount"
          className="w-full border mb-2 p-2"
          onChange={(e) => setBid({ ...bid, bidAmount: e.target.value })}
        />
        <textarea
          placeholder="Message (optional)"
          className="w-full border mb-2 p-2"
          onChange={(e) => setBid({ ...bid, message: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BidModal;