import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Pay<span className="text-gray-500">View</span>
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-6">

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "hover:text-gray-500"
            }
          >
            Services
          </NavLink>

          {/* Seller Option */}
          {user?.role === "seller" && (
            <NavLink
              to="/service/create"
              className="hover:text-gray-500 font-medium"
            >
              Post Service
            </NavLink>
          )}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">
                {user.email}
              </span>

              {/* Admin */}
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="hover:text-gray-500 font-medium"
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={logoutHandler}
                className="btn border border-gray-300 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
