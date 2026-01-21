import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import WarehouseHeader from "../components/WarehouseHeader";
import "./CreateWarehouse.css";

export default function CreateWarehouse() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ Detect mode
  const isEdit = Boolean(state);

  // ✅ Form state (simple but effective validation-ready)
  const [formData, setFormData] = useState({
    warehouseCode: state?.warehouseCode || "",
    warehouseType: state?.warehouseType || "",
    ownerType: state?.ownerType || "",
    aggregatorId: state?.aggregatorId || "",
    address: state?.address || "",
    state: state?.state || "",
    district: state?.district || "",
    pincode: state?.pincode || "",
    latitude: state?.latitude || "",
    longitude: state?.longitude || "",
    contactPerson: state?.contactPerson || "",
    contactMobile: state?.contactMobile || "",
    email: state?.email || "",
    status:
      typeof state?.status === "boolean"
        ? state.status
          ? "ACTIVE"
          : "INACTIVE"
        : state?.status || "ACTIVE",
    remarks: state?.remarks || "",
  });

  const [errors, setErrors] = useState({});

  /* =====================
     VALIDATION
     ===================== */
  const validate = () => {
    const newErrors = {};

    if (!formData.warehouseCode.trim())
      newErrors.warehouseCode = "Warehouse Code is required";

    if (!formData.warehouseType)
      newErrors.warehouseType = "Select Warehouse Type";

    if (!formData.ownerType)
      newErrors.ownerType = "Select Owner Type";

    if (!formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.district.trim())
      newErrors.district = "District is required";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (formData.contactMobile && formData.contactMobile.length < 10)
      newErrors.contactMobile = "Mobile number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     HANDLERS
     ===================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isEdit) {
      alert("Warehouse updated successfully");
    } else {
      alert("Warehouse created successfully");
    }

    navigate("/warehouse");
  };

  return (
    <div className="warehouse-page">
      {/* ✅ PAGE HEADER WITH DYNAMIC TITLE + BREADCRUMB */}
      <WarehouseHeader
        title={isEdit ? "Edit Warehouse" : "Create Warehouse"}
        breadcrumbLabel="Warehouse"
      />

      {/* ✅ FORM CARD */}
      <div className="warehouse-container">
        <h2>{isEdit ? "Edit Warehouse" : "Create Warehouse"}</h2>

        <form className="warehouse-form" onSubmit={handleSubmit}>
          <div className="form-grid two-column">
            <div>
              <label>Warehouse Code *</label>
              <input
                name="warehouseCode"
                value={formData.warehouseCode}
                onChange={handleChange}
                disabled={isEdit}
              />
              {errors.warehouseCode && (
                <span className="error">{errors.warehouseCode}</span>
              )}
            </div>

            <div>
              <label>Warehouse Type *</label>
              <select
                name="warehouseType"
                value={formData.warehouseType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>MAIN</option>
                <option>SUB</option>
              </select>
              {errors.warehouseType && (
                <span className="error">{errors.warehouseType}</span>
              )}
            </div>

            <div>
              <label>Owner Type *</label>
              <select
                name="ownerType"
                value={formData.ownerType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>COMPANY</option>
                <option>THIRD_PARTY</option>
              </select>
              {errors.ownerType && (
                <span className="error">{errors.ownerType}</span>
              )}
            </div>

            <div>
              <label>Aggregator ID</label>
              <input
                name="aggregatorId"
                value={formData.aggregatorId}
                onChange={handleChange}
              />
            </div>

            <div className="full">
              <label>Address</label>
              <textarea
                rows="2"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>State *</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>

            <div>
              <label>District *</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              {errors.district && (
                <span className="error">{errors.district}</span>
              )}
            </div>

            <div>
              <label>Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Latitude</label>
              <input
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Longitude</label>
              <input
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Contact Person</label>
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Contact Mobile</label>
              <input
                name="contactMobile"
                value={formData.contactMobile}
                onChange={handleChange}
              />
              {errors.contactMobile && (
                <span className="error">{errors.contactMobile}</span>
              )}
            </div>

            <div>
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </select>
            </div>

            <div className="full">
              <label>Remarks</label>
              <textarea
                rows="2"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ✅ ACTIONS */}
          <div className="actions">
            <button
              type="button"
              className="secondary"
              onClick={() => navigate("/warehouse")}
            >
              Back
            </button>

            <button type="submit">
              {isEdit ? "Update Warehouse" : "Save Warehouse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
