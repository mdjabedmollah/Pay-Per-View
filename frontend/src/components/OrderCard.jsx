import api from "../../api/axios"
import { useState } from "react";

export default function OrderCard({ order, onComplete }) {
  const [loading, setLoading] = useState(false);

  const completeOrder = async () => {
    try {
      setLoading(true);
      await api.put(`/order/${order._id}`);
      onComplete(order._id);
    } catch (err) {
      alert("Failed to complete order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <p><b>Service:</b> {order.serviceId.title}</p>
      <p><b>Status:</b> {order.status}</p>

      {order.status === "Active" && (
        <button
          onClick={completeOrder}
          className="btn btn-primary mt-4"
        >
          {loading ? "Completing..." : "Complete Order"}
        </button>
      )}
    </div>
  );
}
