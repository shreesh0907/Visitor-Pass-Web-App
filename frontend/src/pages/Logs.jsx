import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const res = await API.get("/api/checklogs");
      setLogs(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch logs");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Check Logs</h1>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
      )}
      <input
  placeholder="Search logs by visitor, pass number, or type"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded mb-6"
/>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3">Visitor</th>
              <th className="p-3">Pass</th>
              <th className="p-3">Type</th>
              <th className="p-3">Scanned By</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>

          <tbody>
           {logs
  .filter((log) =>
    log.visitor?.name?.toLowerCase().includes(search.toLowerCase()) ||
    log.pass?.passNumber?.toLowerCase().includes(search.toLowerCase()) ||
    log.type?.toLowerCase().includes(search.toLowerCase())
  )
  .map((log) => (
              <tr key={log._id} className="border-b">
                <td className="p-3">{log.visitor?.name || "N/A"}</td>
                <td className="p-3">{log.pass?.passNumber || "N/A"}</td>
                <td className="p-3">{log.type}</td>
                <td className="p-3">{log.scannedBy?.email || "N/A"}</td>
                <td className="p-3">
                  {log.time ? new Date(log.time).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Logs;