import { useEffect, useState } from "react";
import { listLenders } from "../api/lenderApi";
import { useNavigate } from "react-router-dom";

export default function LenderMaster() {
  const [lenders, setLenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    const res = await listLenders({ offset: 0, limit: 10 });
    setLenders(res.data.data);
  };

  return (
    <div>
      <button onClick={() => navigate("/lenders/add")}>Add Lender</button>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lenders.map((l) => (
            <tr key={l.id}>
              <td>{l.lenderCode}</td>
              <td>{l.lenderName}</td>
              <td>{l.lenderType}</td>
              <td>{l.status}</td>
              <td>
                <button onClick={() => navigate(`/lenders/view/${l.id}`)}>View</button>
                <button onClick={() => navigate(`/lenders/edit/${l.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
