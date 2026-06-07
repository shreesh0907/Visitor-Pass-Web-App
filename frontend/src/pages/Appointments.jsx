import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Appointments = () => {
  const { user } = useAuth();

  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    visitor: "",
    visitDate: "",
    purpose: "",
    status: "pending",
  });

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const visitorRes = await API.get("/api/visitors");
      const appointmentRes = await API.get("/api/appointments");

      setVisitors(visitorRes.data.data);
      setAppointments(appointmentRes.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/appointments", {
        ...form,
        host: user._id,
      });

      setAppointments([res.data.data, ...appointments]);

      setForm({
        visitor: "",
        visitDate: "",
        purpose: "",
        status: "pending",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create appointment");
    }
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="visitor"
            value={form.visitor}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Visitor</option>
            {visitors.map((visitor) => (
              <option key={visitor._id} value={visitor._id}>
                {visitor.name} - {visitor.email}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="purpose"
            placeholder="Purpose"
            value={form.purpose}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
          Create Appointment
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              {appointment.visitor?.name || "Unknown Visitor"}
            </h2>

            <p>Host: {appointment.host?.email || "Unknown Host"}</p>
            <p>Purpose: {appointment.purpose}</p>
            <p>Status: {appointment.status}</p>
            <p>
              Visit Date:{" "}
              {appointment.visitDate
                ? new Date(appointment.visitDate).toLocaleString()
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
     </>
  );
};

export default Appointments;