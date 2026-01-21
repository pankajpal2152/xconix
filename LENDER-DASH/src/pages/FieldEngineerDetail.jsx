import { useNavigate } from "react-router-dom";
import FieldEngineerPageHeader from "../components/FieldEngineerHeader";
import "./FieldEngineerDetail.css";

export default function FieldEngineerDetail() {
  const navigate = useNavigate();

  // Dummy data (later replace with router state / API)
  const engineer = {
    id: "fe-1234-uuid",
    engineerCode: "ENG-001",
    engineerName: "Amit Kumar",
    mobileNo: "9123456789",
    emailId: "amit.kumar@company.com",
    aggregatorId: "aggr-9988-uuid",
    branchCode: "BR-KOL-01",
    employmentType: "FULL_TIME",
    state: "West Bengal",
    district: "Kolkata",
    baseLocation: "Salt Lake",
    skillset: ["Networking", "Device Installation", "Troubleshooting"],
    assignedDeviceCount: 12,
    engineerStatus: "ACTIVE",
    joiningDate: "2023-04-10",
    lastWorkingDate: null,
    idProofType: "AADHAAR",
    idProofNumber: "XXXX-XXXX-1234",
    currentLatitude: 22.5726,
    currentLongitude: 88.3639,
    locationUpdatedAt: "2025-01-10 10:45 AM",
    remarks: "Experienced field engineer with strong troubleshooting skills",

    // ✅ Serviceable Pincodes
    pincodes: [
      { id: 1, pincode: "700091" },
      { id: 2, pincode: "700102" },
      { id: 3, pincode: "700064" },
    ],
  };

  return (
    <div className="lender-page">
      {/* PAGE HEADER */}
      <FieldEngineerPageHeader />

      {/* CONTENT WRAPPER */}
      <div className="fe-detail-wrapper">
        {/* HEADER STRIP */}
        <div className="fe-detail-top">
          <h2>{engineer.engineerCode}</h2>
          <span className={`status ${engineer.engineerStatus.toLowerCase()}`}>
            {engineer.engineerStatus}
          </span>
        </div>

        {/* INFO CARDS */}
        <div className="card-grid">
          <div className="card">
            <h4>Engineer Info</h4>
            <p><b>Name:</b> {engineer.engineerName}</p>
            <p><b>Employment:</b> {engineer.employmentType}</p>
            <p><b>Branch Code:</b> {engineer.branchCode}</p>
            <p><b>Aggregator ID:</b> {engineer.aggregatorId}</p>
          </div>

          <div className="card">
            <h4>Contact Info</h4>
            <p><b>Mobile:</b> {engineer.mobileNo}</p>
            <p><b>Email:</b> {engineer.emailId}</p>
          </div>

          <div className="card full">
            <h4>Location Details</h4>
            <p><b>Base Location:</b> {engineer.baseLocation}</p>
            <p>{engineer.district}, {engineer.state}</p>
            <p>
              <b>Lat:</b> {engineer.currentLatitude} &nbsp;|&nbsp;
              <b>Lng:</b> {engineer.currentLongitude}
            </p>
            <p><b>Last Updated:</b> {engineer.locationUpdatedAt}</p>
          </div>
        </div>

        {/* SKILL SET */}
        <div className="card">
          <h4>Skill Set</h4>
          <table className="skill-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Skill</th>
              </tr>
            </thead>
            <tbody>
              {engineer.skillset.map((skill, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{skill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ SERVICEABLE PINCODES */}
        <div className="card">
          <h4>Serviceable Pincodes</h4>
          <table className="skill-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {engineer.pincodes.map((pin, index) => (
                <tr key={pin.id}>
                  <td>{index + 1}</td>
                  <td>{pin.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPLOYMENT & ID */}
        <div className="card-grid">
          <div className="card">
            <h4>Employment Details</h4>
            <p><b>Assigned Devices:</b> {engineer.assignedDeviceCount}</p>
            <p><b>Joining Date:</b> {engineer.joiningDate}</p>
            <p>
              <b>Last Working Date:</b>{" "}
              {engineer.lastWorkingDate || "Currently Working"}
            </p>
          </div>

          <div className="card">
            <h4>ID Proof</h4>
            <p><b>Type:</b> {engineer.idProofType}</p>
            <p><b>Number:</b> {engineer.idProofNumber}</p>
          </div>
        </div>

        {/* REMARKS */}
        <div className="card">
          <h4>Remarks</h4>
          <p>{engineer.remarks}</p>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button
            className="secondary"
            onClick={() => navigate("/engineers")}
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/engineers/edit/${engineer.id}`, { state: engineer })
            }
          >
            Edit Engineer
          </button>
        </div>
      </div>
    </div>
  );
}
