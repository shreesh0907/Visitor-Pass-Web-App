import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

const Passes = () => {
  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [passes, setPasses] = useState([]);


  const [form, setForm] = useState({
    visitor: "",
    appointment: "",
    issueDate: "",
    expiryDate: "",
  });

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const visitorRes = await API.get("/api/visitors");
      const appointmentRes = await API.get("/api/appointments");
      const passRes = await API.get("/api/passes");

      setVisitors(visitorRes.data.data);
      setAppointments(appointmentRes.data.data);
      setPasses(passRes.data.data);
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
      const res = await API.post("/api/passes", form);
      setPasses([res.data.data, ...passes]);

      setForm({
        visitor: "",
        appointment: "",
        issueDate: "",
        expiryDate: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create pass");
    }
  };
    const downloadBadge = (pass) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Visitor Pass Badge", 20, 20);

  doc.setFontSize(12);
  doc.text(`Pass Number: ${pass.passNumber}`, 20, 40);
  doc.text(`Visitor: ${pass.visitor?.name || "N/A"}`, 20, 50);
  doc.text(`Email: ${pass.visitor?.email || "N/A"}`, 20, 60);
  doc.text(`Company: ${pass.visitor?.company || "N/A"}`, 20, 70);
  doc.text(`Status: ${pass.status}`, 20, 80);

  if (pass.qrcode) {
    doc.addImage(pass.qrcode, "PNG", 20, 95, 60, 60);
  }
  doc.save(`${pass.passNumber}-badge.pdf`);
};
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Passes</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="visitor" value={form.visitor} onChange={handleChange} className="border p-3 rounded">
            <option value="">Select Visitor</option>
            {visitors.map((visitor) => (
              <option key={visitor._id} value={visitor._id}>
                {visitor.name}
              </option>
            ))}
          </select>

          <select name="appointment" value={form.appointment} onChange={handleChange} className="border p-3 rounded">
            <option value="">Select Appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment._id} value={appointment._id}>
                {appointment.visitor?.name} - {appointment.purpose}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="datetime-local"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
          Create Pass
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {passes.map((pass) => (
          <div key={pass._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold text-xl">{pass.passNumber}</h2>
            <p>Visitor: {pass.visitor?.name}</p>
            <p>Status: {pass.status}</p>

            {pass.qrcode && (
              <img src={pass.qrcode} alt="QR Code" className="w-32 h-32 mt-4" />
            )}
            <button
  onClick={() => downloadBadge(pass)}
  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
>
  Download PDF Badge
</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Passes;