import { useEffect, useState } from "react";
import api from "../../api/axios"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">Users: {stats.users}</div>
        <div className="card">Services: {stats.services}</div>
        <div className="card">Orders: {stats.orders}</div>
      </div>
    </div>
  );
}
