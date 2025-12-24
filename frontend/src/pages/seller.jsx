import { useEffect, useState } from "react";
import api from "../../api/axios"
import OrderCard from "../components/OrderCard";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/order/seller").then((res) => {
      setOrders(res.data.orders);
    });
  }, []);

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "Completed" } : o
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">
        Seller Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
}
