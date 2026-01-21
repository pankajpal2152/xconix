import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, ArrowUp, ArrowDown } from "lucide-react";
import "./LenderTableCard.css"; // reuse SAME CSS

export default function LenderBranchTableCard() {
  const navigate = useNavigate();

  /* =====================
     DUMMY DATA
     ===================== */
  const [branches, setBranches] = useState([
    {
      id: 1,
      branchCode: "BR-001",
      branchName: "Kolkata Branch",
      lender: "Shriram Finance",
      state: "West Bengal",
      active: true,
    },
    {
      id: 2,
      branchCode: "BR-002",
      branchName: "Mumbai Branch",
      lender: "HDFC Finance",
      state: "Maharashtra",
      active: false,
    },
    {
      id: 3,
      branchCode: "BR-003",
      branchName: "Bangalore Branch",
      lender: "Bajaj Finserv",
      state: "Karnataka",
      active: true,
    },
  ]);

  /* =====================
     STATUS TOGGLE
     ===================== */
  const handleToggle = (id) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, active: !b.active } : b
      )
    );
  };

  /* =====================
     SORTING
     ===================== */
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return branches;

    return [...branches].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "boolean") {
        return sortConfig.direction === "asc"
          ? Number(aVal) - Number(bVal)
          : Number(bVal) - Number(aVal);
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [branches, sortConfig]);

  const SortIcon = ({ column }) =>
    sortConfig.key === column ? (
      sortConfig.direction === "asc" ? (
        <ArrowUp size={14} />
      ) : (
        <ArrowDown size={14} />
      )
    ) : null;

  return (
    <div className="lender-table-wrapper">
      <div className="card lender-table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("branchCode")}>
                Branch Code <SortIcon column="branchCode" />
              </th>
              <th onClick={() => handleSort("branchName")}>
                Branch Name <SortIcon column="branchName" />
              </th>
              <th onClick={() => handleSort("lender")}>
                Lender <SortIcon column="lender" />
              </th>
              <th onClick={() => handleSort("state")}>
                State <SortIcon column="state" />
              </th>
              <th onClick={() => handleSort("active")}>
                Status <SortIcon column="active" />
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.branchCode}</td>
                <td>{branch.branchName}</td>
                <td>{branch.lender}</td>
                <td>{branch.state}</td>

                {/* STATUS */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={branch.active}
                      onChange={() => handleToggle(branch.id)}
                    />
                    <span className="slider" />
                  </label>
                </td>

                {/* ACTIONS */}
                <td>
                  {/* VIEW */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/lender-branches/view/${branch.id}`, {
                        state: branch,
                      })
                    }
                  >
                    <Eye size={16} />
                  </button>

                  {/* EDIT */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/lender-branches/edit/${branch.id}`, {
                        state: branch,
                      })
                    }
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
