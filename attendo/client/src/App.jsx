import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// --- Placeholder Dashboards ---
const EmployeeDashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold text-indigo-600">Employee Dashboard</h1>
    <p>Welcome! You can see your attendance here.</p>
    <button onClick={() => { localStorage.clear(); window.location.href = '/' }} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
  </div>
);

const AdminDashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>
    <p>Restricted Area. Manage all employees here.</p>
    <button onClick={() => { localStorage.clear(); window.location.href = '/' }} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
  </div>
);

// --- PROTECTED ROUTE COMPONENT ---
// This checks if the user has the correct role
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole'); // Get saved role

  if (!userRole) {
    return <Navigate to="/" replace />; // Not logged in? Go to login
  }

  if (userRole !== allowedRole) {
    // If employee tries to access admin, send them to their own page
    return <Navigate to={userRole === 'admin' ? '/admin' : '/employee'} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Employee Route */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;