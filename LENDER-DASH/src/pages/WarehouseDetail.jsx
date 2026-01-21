import { useNavigate, useLocation } from "react-router-dom";
import WarehouseHeader from "../components/WarehouseHeader";
import "./WarehouseDetail.css";

export default function WarehouseDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* =========================
     NORMALIZED WAREHOUSE DATA
     ========================= */
  const warehouse = {
    code: state?.code || "WH-001",
    type: state?.type || "MAIN",
    ownerType: state?.ownerType || "COMPANY",
    aggregatorId: state?.aggregatorId || "9d2f-33ad-99ff",
    status: state?.status ?? "ACTIVE",
    address: state?.address || "Godrej Garden City, Ahmedabad",
    state: state?.state || "Gujarat",
    district: state?.district || "Ahmedabad",
    latitude: state?.latitude || 23.0225,
    longitude: state?.longitude || 72.5714,
    contactPerson: state?.contactPerson || "Rahul Sharma",
    mobile: state?.mobile || "9876543210",
    email: state?.email || "warehouse@company.com",
    remarks: state?.remarks || "Primary distribution center",

    // ✅ ALWAYS AN ARRAY (FIX)
    pincodes: Array.isArray(state?.pincodes)
      ? state.pincodes
      : [
          { id: 1, pincode: "382470" },
          { id: 2, pincode: "382475" },
          { id: 3, pincode: "380005" },
        ],
  };

  /* =========================
     SAFE STATUS HANDLING
     ========================= */
  const statusClass =
    typeof warehouse.status === "boolean"
      ? warehouse.status
        ? "active"
        : "inactive"
      : String(warehouse.status).toLowerCase();

  const statusLabel =
    typeof warehouse.status === "boolean"
      ? warehouse.status
        ? "ACTIVE"
        : "INACTIVE"
      : warehouse.status;

  return (
    <div className="warehouse-page">
      {/* PAGE HEADER */}
      <WarehouseHeader />

      {/* CONTENT */}
      <div className="warehouse-detail-container">
        {/* HEADER STRIP */}
        <div className="header">
          <div>
            <h2>{warehouse.code}</h2>
            <span className={`status ${statusClass}`}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="card-grid">
          <div className="card">
            <h4>Warehouse Info</h4>
            <p><b>Type:</b> {warehouse.type}</p>
            <p><b>Owner Type:</b> {warehouse.ownerType}</p>
            <p><b>Aggregator ID:</b> {warehouse.aggregatorId}</p>
          </div>

          <div className="card">
            <h4>Contact Info</h4>
            <p><b>Person:</b> {warehouse.contactPerson}</p>
            <p><b>Mobile:</b> {warehouse.mobile}</p>
            <p><b>Email:</b> {warehouse.email}</p>
          </div>

          <div className="card full">
            <h4>Address</h4>
            <p>{warehouse.address}</p>
            <p>{warehouse.district}, {warehouse.state}</p>
            <p>
              <b>Lat:</b> {warehouse.latitude} |{" "}
              <b>Lng:</b> {warehouse.longitude}
            </p>
          </div>
        </div>

        {/* PINCODES */}
        <div className="card">
          <h4>Serviceable Pincodes</h4>

          <table className="pincode-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {warehouse.pincodes.map((pin, index) => (
                <tr key={pin.id}>
                  <td>{index + 1}</td>
                  <td>{pin.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* REMARKS */}
        <div className="card">
          <h4>Remarks</h4>
          <p>{warehouse.remarks}</p>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button
            className="secondary"
            onClick={() => navigate("/warehouse")}
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/warehouse/edit/${warehouse.code}`, {
                state: warehouse,
              })
            }
          >
            Edit Warehouse
          </button>
        </div>
      </div>
    </div>
  );
}
