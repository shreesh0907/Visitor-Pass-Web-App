import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-xl">
        Visitor Pass System
      </Link>

      <div className="flex gap-4 items-center">
        <span className="text-sm">{user?.role}</span>

        <Link to="/dashboard" className="text-blue-600">
          Dashboard
        </Link>

        <button onClick={handleLogout} className="text-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;