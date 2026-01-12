import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditEmployee from './pages/EditEmployee';
import EditAttendance from './pages/EditAttendance';
import AddAttendance from './pages/AddAttendance';
import AddEmployee from './pages/AddEmployee';

// --- PROTECTED ROUTE COMPONENT ---
// This was missing in your file, causing the "ReferenceError"
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');

  // 1. Not logged in? Go to Login
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // 2. Logged in but wrong role? Go to your dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/employee'} replace />;
  }

  // 3. Authorized!
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/" element={<Login />} />

        {/* Employee Routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Features - Edit Pages */}
        <Route
          path="/admin/edit-employee/:id"
          element={
            <ProtectedRoute allowedRole="admin">
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-attendance/:id"
          element={
            <ProtectedRoute allowedRole="admin">
              <EditAttendance />
            </ProtectedRoute>
          }
        />

        {/* Admin Features - Add Logs */}
        <Route
          path="/admin/add-attendance"
          element={
            <ProtectedRoute allowedRole="admin">
              <AddAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-employee"
          element={
            <ProtectedRoute allowedRole="admin">
              <AddEmployee />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;