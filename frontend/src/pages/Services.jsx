import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/service").then(res => setServices(res.data.services));
  }, []);

  const order = async (id) => {
    await api.post("/order", { serviceId: id });
    alert("Order placed");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
      {services.map(s => (
        <div key={s._id} className="card">
          <h3 className="font-bold text-xl">{s.title}</h3>
          <p className="text-gray-600 mt-2">{s.description}</p>
          <button
            onClick={() => order(s._id)}
            className="btn btn-primary mt-4 w-full"
          >
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
}
