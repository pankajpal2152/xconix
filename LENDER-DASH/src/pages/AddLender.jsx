import { useState } from "react";
import { createLender } from "../api/lenderApi";
import { useNavigate } from "react-router-dom";

export default function AddLender() {
  const [form, setForm] = useState({
    lenderCode: "",
    lenderName: "",
    lenderType: "NBFC",
    contactPersonName: "",
    contactMobile: "",
    contactEmail: "",
    registeredAddress: "",
    state: "",
    region: "",
    gstNumber: "",
    panNumber: "",
    billingCycle: "WEEKLY",
    paymentTermsDays: 0,
    ldApplicable: true,
    ldPercentageCap: 0,
    pilotStartDate: "",
    pilotEndDate: "",
    agreementStartDate: "",
    agreementEndDate: "",
    status: "ACTIVE",
    remarks: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLender(form);
    navigate("/lenders");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Lender Code" onChange={(e) => setForm({ ...form, lenderCode: e.target.value })} />
      <input placeholder="Lender Name" onChange={(e) => setForm({ ...form, lenderName: e.target.value })} />
      <button type="submit">Create</button>
    </form>
  );
}
