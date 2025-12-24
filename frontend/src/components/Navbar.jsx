import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">
          Pay<span className="text-gray-500">View</span>
        </Link>

        <div className="space-x-5">
          <Link to="/services">Services</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
