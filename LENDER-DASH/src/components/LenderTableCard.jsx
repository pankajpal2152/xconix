import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteLender } from "../api/lenderApi";
import "./LenderTableCard.css";

export default function LenderTableCard({
  lenders,
  page,
  setPage,
  maxPage,
  reload,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete lender?")) return;
    await deleteLender(id);
    reload();
  };

  return (
    <div className="lender-table-wrapper">
      <div className="card lender-table-card">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Region</th>
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
                <td>{l.region}</td>
                <td>{l.status}</td>
                <td>
                  <button onClick={() => navigate(`/lenders/view/${l.id}`)}>
                    <Eye size={16} />
                  </button>
                  <button onClick={() => navigate(`/lenders/edit/${l.id}`)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(l.id)}>
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span>{page} / {maxPage}</span>
          <button disabled={page === maxPage} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
