import { useEffect, useState } from "react";
import api from "../../api/axios";
import ReviewForm from "../components/ReviewForm";

export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/order/buyer").then((res) => {
      setOrders(res.data.orders);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card">
            <p><b>Status:</b> {order.status}</p>

            {order.status === "Completed" && !order.reviewed && (
  <ReviewForm
    orderId={order._id}
    onSuccess={() => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id ? { ...o, reviewed: true } : o
        )
      );
    }}
  />
)}

{order.reviewed && (
  <p className="text-green-600 font-medium mt-2">
     Review submitted
  </p>
)}

          </div>
        ))}
      </div>
    </div>
  );
}
