import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Scanner = () => {
  const [passId, setPassId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scannerRef.current.render(
      (decodedText) => {
        setPassId(decodedText);
        setMessage("QR scanned successfully");

        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      },
      () => {}
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const handleCheckIn = async () => {
    setMessage("");
    setError("");

    try {
      await API.post("/api/checklogs/checkin", { passId });
      setMessage("Visitor checked in successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    setMessage("");
    setError("");

    try {
      await API.post("/api/checklogs/checkout", { passId });
      setMessage("Visitor checked out successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Check-out failed");
    }
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-6">QR Scanner</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
        {message && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {message}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <div id="qr-reader" className="mb-6"></div>

        <input
          placeholder="Scanned Pass ID / Manual Pass ID"
          value={passId}
          onChange={(e) => setPassId(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <div className="flex gap-4">
          <button
            onClick={handleCheckIn}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            className="bg-red-600 text-white px-6 py-3 rounded"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Scanner;