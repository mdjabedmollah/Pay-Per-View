import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ServiceCard({ service }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleOrder = async () => {
    try {
      setLoading(true);
      const res = await api.post("/order", {
        serviceId: service._id,
      });
      setMsg("✅ Order created successfully");
    } catch (err) {
      setMsg(
        err.response?.data?.message || "❌ Order failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="text-gray-600 mt-2">
        {service.description}
      </p>
      <p className="font-semibold mt-2">
        ৳ {service.price}
      </p>

      {user?.role === "buyer" ? (
        <button
          onClick={handleOrder}
          disabled={loading}
          className="btn btn-primary w-full mt-4"
        >
          {loading ? "Ordering..." : "Order Now"}
        </button>
      ) : (
        <button
          disabled
          className="btn w-full mt-4 opacity-50"
        >
          Login as Buyer to Order
        </button>
      )}

      {msg && (
        <p className="text-sm text-center mt-2">
          {msg}
        </p>
      )}
    </div>
  );
}
