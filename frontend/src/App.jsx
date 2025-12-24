import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import SellerOrders from "./pages/seller";
import CreateService from "./pages/CreateService";
import BuyerOrders from "./pages/BuyerOrder";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/service/create" element={<CreateService />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
