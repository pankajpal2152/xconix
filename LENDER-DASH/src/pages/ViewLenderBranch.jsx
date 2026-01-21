import { useLocation, useNavigate } from "react-router-dom";
import LenderPageHeader from "../components/LenderPageHeader";

export default function ViewLenderBranch() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const branch = state || {
    branchCode: "BR-001",
    branchName: "Sample Branch",
    lender: "Sample Lender",
    state: "NA",
    active: true,
  };

  return (
    <div className="lender-page">
      <LenderPageHeader
        title="View Lender Branch"
        breadcrumbLabel="Lender Branch"
      />

      <div className="card" style={{ margin: "35px 100px", padding: "20px" }}>
        <p><b>Branch Code:</b> {branch.branchCode}</p>
        <p><b>Branch Name:</b> {branch.branchName}</p>
        <p><b>Lender:</b> {branch.lender}</p>
        <p><b>State:</b> {branch.state}</p>
        <p><b>Status:</b> {branch.active ? "ACTIVE" : "INACTIVE"}</p>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
