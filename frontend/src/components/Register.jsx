import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/register", form);
    navigate("/login");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      <input className="input" placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})} />

      <input className="input" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})} />

      <input className="input" type="password" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})} />

      <select className="input"
        onChange={e=>setForm({...form,role:e.target.value})}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <button className="btn btn-primary w-full">Register</button>
    </form>
  );
}
