import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CreateService() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //  only seller allowed
  if (!user || user.role !== "seller") {
    return (
      <div className="p-10 text-center text-red-500">
        Only sellers can create services.
      </div>
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/service", {
        ...form,
        price: Number(form.price),
      });

      setMessage("Service created successfully");
      navigate("/services");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Service creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create New Service
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="input"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className="input h-28"
            placeholder="Service Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <input
            type="number"
            className="input"
            placeholder="Price (৳)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <input
            className="input"
            placeholder="Category (e.g. Web Development)"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Creating..." : "Create Service"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
