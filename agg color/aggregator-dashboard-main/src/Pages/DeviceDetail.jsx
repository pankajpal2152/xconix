import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeviceById } from "../api/deviceApi";
import DeviceHeader from "../components/DeviceHeader";
import "./DeviceDetail.css";

const formatDate = (isoDateString) => {
  if (!isoDateString) return "N/A";
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const formatDateTime = (isoDateString) => {
  if (!isoDateString) return "N/A";
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "N/A";
  }
};

const getLocationBadgeStyle = (locationType) => {
  const styles = {
    PRODUCTION_FLOOR: { backgroundColor: "#e3f2fd", color: "#1976d2" },
    WAREHOUSE: { backgroundColor: "#fff3e0", color: "#f57c00" },
    FIELD_ENGINEER: { backgroundColor: "#e8f5e9", color: "#2e7d32" },
    VEHICLE: { backgroundColor: "#f3e5f5", color: "#7b1fa2" },
  };
  return styles[locationType] || { backgroundColor: "#f5f5f5", color: "#666" };
};

const getMovementStatusBadge = (status) => {
  const styles = {
    IN_TRANSIT: { backgroundColor: "#fff3e0", color: "#f57c00" },
    DELIVERED: { backgroundColor: "#e8f5e9", color: "#2e7d32" },
    RETURNED: { backgroundColor: "#f3e5f5", color: "#7b1fa2" },
    CANCELLED: { backgroundColor: "#ffebee", color: "#c62828" },
  };
  return styles[status] || { backgroundColor: "#f5f5f5", color: "#666" };
};

export default function DeviceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getDeviceById(id);
        if (result.success && result.data) {
          setDevice(result.data);
        } else {
          setError(result.error || "Failed to fetch device data");
        }
      } catch {
        setError("An unexpected error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDevice();
    else setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="lender-page">
        <DeviceHeader />
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <div className="spinner"></div>
          <p>Loading device details...</p>
        </div>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="lender-page">
        <DeviceHeader />
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <h2 className="text">Error</h2>
          <p>{error || "Device not found"}</p>
          <button onClick={() => navigate("/devices")}>
            Back to Devices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lender-page">
      <DeviceHeader />

      <div className="device-detail-wrapper">
        <h2 className="text">{device.imei}</h2>
        <p>Device ID: <strong>{device.id}</strong></p>
      </div>

      <div className="card-grid">
        <div className="card">
          <h4 className="text">Device Information</h4>
          <p><b>IMEI:</b> {device.imei}</p>
          <p><b>QR Code:</b> {device.qr}</p>
          <p><b>Created At:</b> {formatDateTime(device.createdAt)}</p>
          <p><b>Updated At:</b> {formatDateTime(device.updatedAt)}</p>
        </div>

        <div className="card">
          <h4 className="text">Current Location</h4>
          <p>
            <b>Location Type:</b>{" "}
            <span style={getLocationBadgeStyle(device.locationType)}>
              {device.locationType}
            </span>
          </p>
        </div>

        <div className="card">
          <h4 className="text">Installation Details</h4>
          <p>
            <b>Requisition ID:</b>{" "}
            {device.installationRequisitionId || "Not assigned"}
          </p>
        </div>
      </div>

      {device.deviceMovements?.length > 0 && (
        <div className="card">
          <h4 className="text">Movement History</h4>
          <table>
            <tbody>
              {device.deviceMovements.map((m) => (
                <tr key={m.id}>
                  <td>{m.movementType}</td>
                  <td>{formatDate(m.movementDate)}</td>
                  <td>
                    <span style={getMovementStatusBadge(m.movementStatus)}>
                      {m.movementStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="actions">
        <button onClick={() => navigate("/devices")}>Back</button>
        <button onClick={() => navigate(`/devices/edit/${device.id}`)}>
          Edit Device
        </button>
      </div>
    </div>
  );
}
