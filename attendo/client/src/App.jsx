import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

// Placeholder components for next steps
const EmployeeDashboard = () => <div className="p-10 text-xl text-center">Employee Dashboard (Coming Soon)</div>;
const AdminDashboard = () => <div className="p-10 text-xl text-center">Admin Dashboard (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;