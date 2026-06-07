import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Passes from "./pages/Passes";
import Scanner from "./pages/Scanner";
import Logs from "./pages/Logs";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visitors"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin", "security"]}>
              <Visitors />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin", "employee", "security"]}>
              <Appointments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/passes"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin", "security"]}>
              <Passes />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/scanner"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin", "security"]}>
              <Scanner />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/logs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["admin", "security"]}>
              <Logs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;