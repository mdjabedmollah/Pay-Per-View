import { useState } from "react";
import api from "../../api/axios";

export default function ReviewForm({ orderId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitReview = async () => {
    try {
      setLoading(true);
      await api.post("/review", { orderId, rating, comment });
      setMsg("Review submitted successfully");
    } catch (err) {
      setMsg(err.response?.data?.message || "Review failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-4">
      <h3 className="font-bold mb-2">Leave a Review</h3>

      <select
        className="input"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} Star</option>
        ))}
      </select>

      <textarea
        className="input mt-2"
        placeholder="Write your feedback"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="btn btn-primary w-full mt-3"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {msg && <p className="text-center text-sm mt-2">{msg}</p>}
    </div>
  );
}
