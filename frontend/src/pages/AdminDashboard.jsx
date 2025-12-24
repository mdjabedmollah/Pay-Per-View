import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => {
        console.log("ADMIN STATS:", res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.error("ADMIN ERROR:", err.response?.data);
        setError("Unauthorized or API error");
      });
  }, []);

  if (error) {
    return (
      <div className="p-10 text-red-500 text-center">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-10 text-center">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">Users: {stats.users}</div>
        <div className="card">Services: {stats.services}</div>
        <div className="card">Orders: {stats.orders}</div>
      </div>
    </div>
  );
}
