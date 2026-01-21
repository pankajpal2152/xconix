import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";

import LenderMaster from "./pages/LenderMaster";
import AddLender from "./pages/AddLender";
import EditLender from "./pages/EditLender";
import ViewLender from "./pages/ViewLender";

import AggregatorMaster from "./pages/AggregatorMaster";
import AddAggregator from "./pages/AddAggregator";
import EditAggregator from "./pages/EditAggregator";
import ViewAggregator from "./pages/ViewAggregator";

import FieldEngineerMaster from "./pages/FieldEngineerMaster";
import FieldEngineerForm from "./pages/FieldEngineerForm";
import EditFieldEngineer from "./pages/EditFieldEngineer";
import FieldEngineerDetail from "./pages/FieldEngineerDetail";

import WarehouseMaster from "./pages/WarehouseMaster";
import CreateWarehouse from "./pages/CreateWarehouse";
import EditWarehouse from "./pages/EditWarehouse";
import WarehouseDetail from "./pages/WarehouseDetail";

import LenderBranchMaster from "./pages/LenderBranchMaster";
import EditLenderBranch from "./pages/EditLenderBranch";
import ViewLenderBranch from "./pages/ViewLenderBranch";

import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";

import "./App.css";

/* =====================
   AUTH CHECK
   ===================== */
const isAuthenticated = () => !!localStorage.getItem("token");

/* =====================
   PROTECTED LAYOUT
   ===================== */
function ProtectedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        closeSidebar={closeSidebar}
      />

      <div className="main">
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>

      {isMobile && isSidebarOpen && (
        <div className="overlay" onClick={closeSidebar} />
      )}
    </div>
  );
}

/* =====================
   APP ROOT
   ===================== */
export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/lenders" element={<LenderMaster />} />
        <Route path="/lenders/add" element={<AddLender />} />
        <Route path="/lenders/edit/:id" element={<EditLender />} />
        <Route path="/lenders/view/:id" element={<ViewLender />} />

        <Route path="/aggregators" element={<AggregatorMaster />} />
        <Route path="/aggregators/add" element={<AddAggregator />} />
        <Route path="/aggregators/edit/:id" element={<EditAggregator />} />
        <Route path="/aggregators/view/:id" element={<ViewAggregator />} />

        <Route path="/engineers" element={<FieldEngineerMaster />} />
        <Route path="/engineers/add" element={<FieldEngineerForm />} />
        <Route path="/engineers/edit/:id" element={<EditFieldEngineer />} />
        <Route path="/engineers/view/:id" element={<FieldEngineerDetail />} />

        <Route path="/warehouse" element={<WarehouseMaster />} />
        <Route path="/warehouse/create" element={<CreateWarehouse />} />
        <Route path="/warehouse/edit/:id" element={<EditWarehouse />} />
        <Route path="/warehouse/view/:id" element={<WarehouseDetail />} />

        <Route path="/lender-branches" element={<LenderBranchMaster />} />
        <Route path="/lender-branches/add" element={<EditLenderBranch />} />
        <Route path="/lender-branches/edit/:id" element={<EditLenderBranch />} />
        <Route path="/lender-branches/view/:id" element={<ViewLenderBranch />} />

        <Route path="/users/create" element={<CreateUser />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
