import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/api/dashboard/stats");
      setStats(res.data.data);
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="mb-6">Logged in as: {user?.role}</p>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl shadow">Visitors: {stats.totalVisitors}</div>
            <div className="bg-white p-5 rounded-xl shadow">Appointments: {stats.totalAppointments}</div>
            <div className="bg-white p-5 rounded-xl shadow">Active Passes: {stats.activePasses}</div>
            <div className="bg-white p-5 rounded-xl shadow">Check-ins Today: {stats.todayCheckIns}</div>
            <div className="bg-white p-5 rounded-xl shadow">Check-outs Today: {stats.todayCheckOuts}</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(user?.role === "admin" || user?.role === "security") && (
            <button onClick={() => navigate("/visitors")} className="bg-blue-600 text-white p-4 rounded">
              Visitors
            </button>
          )}

          <button onClick={() => navigate("/appointments")} className="bg-blue-600 text-white p-4 rounded">
            Appointments
          </button>

          {(user?.role === "admin" || user?.role === "security") && (
            <>
              <button onClick={() => navigate("/passes")} className="bg-blue-600 text-white p-4 rounded">
                Passes
              </button>

              <button onClick={() => navigate("/scanner")} className="bg-green-600 text-white p-4 rounded">
                Scanner
              </button>

              <button onClick={() => navigate("/logs")} className="bg-purple-600 text-white p-4 rounded">
                Logs
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;