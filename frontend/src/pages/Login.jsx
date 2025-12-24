import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const submit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await api.post("/login", { email, password });
    setUser(res.data.user);
    navigate("/services");
  } catch {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mt-2">
          Login to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-black">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
