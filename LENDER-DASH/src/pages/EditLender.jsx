import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLenderById, updateLender } from "../api/lenderApi";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

export default function EditLender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getLenderById(id).then(res => setForm(res.data.data));
  }, [id]);

  if (!form) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLender(id, form);
    navigate("/lenders");
  };

  return (
    <div className="lender-form-page">
      <LenderPageHeader />
      <form className="edit-form two-column" onSubmit={handleSubmit}>
        <input value={form.lenderName} onChange={e => setForm({...form, lenderName:e.target.value})} />
        <button className="primary">Update</button>
      </form>
    </div>
  );
}
