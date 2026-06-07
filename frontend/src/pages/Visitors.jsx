import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    company: "",
    purpose: "",
  });

  const [error, setError] = useState("");

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/api/visitors");
      setVisitors(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch visitors");
    }
  };

  useEffect(() => {
    fetchVisitors();
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
      const res = await API.post("/api/visitors", form);
      setVisitors([res.data.data, ...visitors]);

      setForm({
        name: "",
        email: "",
        phone: "",
        photo: "",
        company: "",
        purpose: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create visitor");
    }
  };
    const handleDelete = async (id) => {
  await API.delete(`/api/visitors/${id}`);
  setVisitors(visitors.filter((visitor) => visitor._id !== id));
};

const handleEdit = (visitor) => {
  setEditingId(visitor._id);
  setForm({
    name: visitor.name,
    email: visitor.email,
    phone: visitor.phone,
    photo: visitor.photo,
    company: visitor.company,
    purpose: visitor.purpose,
  });
};

const handleUpdate = async (e) => {
  e.preventDefault();

  const res = await API.put(`/api/visitors/${editingId}`, {
    data: form,
  });

  setVisitors(
    visitors.map((visitor) =>
      visitor._id === editingId ? res.data.data : visitor
    )
  );

  setEditingId(null);
  setForm({
    name: "",
    email: "",
    phone: "",
    photo: "",
    company: "",
    purpose: "",
  });
};
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Visitors</h1>

      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
  placeholder="Search visitors by name or company"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded mb-6"
/>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-3 rounded" />

          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-3 rounded" />

          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-3 rounded" />

          <input name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} className="border p-3 rounded" />

          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="border p-3 rounded" />

          <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} className="border p-3 rounded" />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
  {editingId ? "Update Visitor" : "Add Visitor"}
        </button>
      </form>
        <div className="flex gap-2 mt-4">
  <button
    onClick={() => handleEdit(visitor)}
    className="bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(visitor._id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visitors
  .filter((visitor) =>
    visitor.name.toLowerCase().includes(search.toLowerCase()) ||
    visitor.company.toLowerCase().includes(search.toLowerCase()))
    .map((visitor) => (
          <div key={visitor._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold text-xl">{visitor.name}</h2>
            <p>Email: {visitor.email}</p>
            <p>Phone: {visitor.phone}</p>
            <p>Company: {visitor.company}</p>
            <p>Purpose: {visitor.purpose}</p>

            {visitor.photo && (
              <img
                src={visitor.photo}
                alt={visitor.name}
                className="w-20 h-20 rounded-full object-cover mt-3"
              />
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Visitors;