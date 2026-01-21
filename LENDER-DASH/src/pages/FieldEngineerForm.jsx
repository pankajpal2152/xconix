import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LenderPageHeader from "../components/LenderPageHeader";
import "./FieldEngineerForm.css";

export default function FieldEngineerForm() {
  const navigate = useNavigate();

  const [engineer, setEngineer] = useState({
    engineerCode: "",
    engineerName: "",
    mobileNo: "",
    emailId: "",
    aggregatorId: "",
    branchCode: "",
    employmentType: "",
    state: "",
    district: "",
    baseLocation: "",
    skillset: "",
    assignedDeviceCount: "",
    engineerStatus: "",
    joiningDate: "",
    lastWorkingDate: "",
    idProofType: "",
    idProofNumber: "",
    currentLatitude: "",
    currentLongitude: "",
    remarks: "",
    pincodes: [""],
  });

  const handleChange = (e) => {
    setEngineer({ ...engineer, [e.target.name]: e.target.value });
  };

  const handlePincodeChange = (index, value) => {
    const updated = [...engineer.pincodes];
    updated[index] = value;
    setEngineer({ ...engineer, pincodes: updated });
  };

  const addPincode = () => {
    setEngineer({ ...engineer, pincodes: [...engineer.pincodes, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Field Engineer Data:", engineer);
    navigate("/engineers");
  };

  return (
    <div className="lender-form-page">
      {/* PAGE HEADER */}
      <LenderPageHeader
        title="Field Engineer Master"
        breadcrumbLabel="Field Engineer"
      />

      {/* CARD */}
      <div className="edit-lender-page">
        <div className="card fe-card full-width">
          <h2 className="edit-lender-title">Add Field Engineer</h2>

          <form className="fe-form" onSubmit={handleSubmit}>
            {/* BASIC DETAILS */}
            <section>
              <h3>Basic Details</h3>
              <div className="fe-grid">
                <input name="engineerCode" placeholder="Engineer Code" onChange={handleChange} />
                <input name="engineerName" placeholder="Engineer Name" onChange={handleChange} />
                <input name="mobileNo" placeholder="Mobile No" onChange={handleChange} />
                <input name="emailId" placeholder="Email ID" onChange={handleChange} />
              </div>
            </section>

            {/* ORGANIZATION */}
            <section>
              <h3>Organization</h3>
              <div className="fe-grid">
                <input name="aggregatorId" placeholder="Aggregator UUID" onChange={handleChange} />
                <input name="branchCode" placeholder="Branch Code" onChange={handleChange} />

                <select name="employmentType" onChange={handleChange}>
                  <option value="">Employment Type</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="CONTRACT">Contract</option>
                </select>

                <select name="engineerStatus" onChange={handleChange}>
                  <option value="">Engineer Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </section>

            {/* LOCATION */}
            <section>
              <h3>Location</h3>
              <div className="fe-grid">
                <input name="state" placeholder="State" onChange={handleChange} />
                <input name="district" placeholder="District" onChange={handleChange} />
                <input name="baseLocation" placeholder="Base Location" onChange={handleChange} />
              </div>
            </section>

            {/* SKILLS */}
            <section>
              <h3>Skills & Devices</h3>
              <div className="fe-grid">
                <input name="skillset" placeholder="Skillset" onChange={handleChange} />
                <input name="assignedDeviceCount" placeholder="Assigned Device Count" onChange={handleChange} />
              </div>
            </section>

            {/* DATES */}
            <section>
              <h3>Dates</h3>
              <div className="fe-grid">
                <input type="date" name="joiningDate" onChange={handleChange} />
                <input type="date" name="lastWorkingDate" onChange={handleChange} />
              </div>
            </section>

            {/* ID PROOF */}
            <section>
              <h3>ID Proof</h3>
              <div className="fe-grid">
                <select name="idProofType" onChange={handleChange}>
                  <option value="">ID Proof Type</option>
                  <option value="AADHAAR">Aadhaar</option>
                  <option value="PAN">PAN</option>
                </select>

                <input name="idProofNumber" placeholder="ID Proof Number" onChange={handleChange} />
              </div>
            </section>

            {/* LIVE LOCATION */}
            <section>
              <h3>Live Location</h3>
              <div className="fe-grid">
                <input name="currentLatitude" placeholder="Latitude" onChange={handleChange} />
                <input name="currentLongitude" placeholder="Longitude" onChange={handleChange} />
              </div>
            </section>

            {/* PINCODES */}
            <section>
              <h3>Pincodes Served</h3>
              <div className="fe-grid">
                {engineer.pincodes.map((pin, index) => (
                  <input
                    key={index}
                    placeholder="Pincode"
                    value={pin}
                    onChange={(e) => handlePincodeChange(index, e.target.value)}
                  />
                ))}
              </div>

              <button type="button" className="add-btn" onClick={addPincode}>
                + Add Pincode
              </button>
            </section>

            {/* REMARKS */}
            <section>
              <h3>Remarks</h3>
              <div className="fe-grid">
                <textarea
                  className="full-width"
                  name="remarks"
                  placeholder="Remarks"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* ACTIONS */}
            <div className="form-actions">
              <button
                type="button"
                className="add-more-btn secondary"
                onClick={() => navigate("/engineers")}
              >
                Back
              </button>

              <button type="submit" className="submit-btn">
                Save Engineer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
