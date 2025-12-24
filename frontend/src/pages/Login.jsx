import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/login", { email, password });
    setUser(res.data.user);
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary w-full">Login</button>
    </form>
  );
}
