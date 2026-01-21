import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLenderById } from "../api/lenderApi";

export default function ViewLender() {
  const { id } = useParams();
  const [lender, setLender] = useState(null);

  useEffect(() => {
    getLenderById(id).then((res) => {
      setLender(res.data.data);
    });
  }, [id]);

  if (!lender) return null;

  return (
    <div>
      <h2>{lender.lenderName}</h2>
      <p>Lender Code: {lender.lenderCode}</p>
      <p>Status: {lender.status}</p>
    </div>
  );
}
