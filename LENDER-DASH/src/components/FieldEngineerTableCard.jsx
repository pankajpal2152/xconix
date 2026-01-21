import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, ArrowUp, ArrowDown } from "lucide-react";
import "./FieldEngineerTableCard.css";

export default function FieldEngineerTableCard() {
  const navigate = useNavigate();

  /* =====================
     DUMMY DATA (NOW MUTABLE)
     ===================== */
  const [engineers, setEngineers] = useState([
    {
      id: 1,
      engineerCode: "FE001",
      engineerName: "Amit Kumar",
      mobileNo: "9876543210",
      employmentType: "FULL_TIME",
      state: "West Bengal",
      baseLocation: "Kolkata",
      status: true,
    },
    {
      id: 2,
      engineerCode: "FE002",
      engineerName: "Rahul Singh",
      mobileNo: "9123456780",
      employmentType: "CONTRACT",
      state: "Maharashtra",
      baseLocation: "Mumbai",
      status: false,
    },
    {
      id: 3,
      engineerCode: "FE003",
      engineerName: "Sourav Das",
      mobileNo: "9988776655",
      employmentType: "FULL_TIME",
      state: "Karnataka",
      baseLocation: "Bangalore",
      status: true,
    },
    {
      id: 4,
      engineerCode: "FE004",
      engineerName: "Neha Sharma",
      mobileNo: "9090909090",
      employmentType: "CONTRACT",
      state: "Delhi",
      baseLocation: "New Delhi",
      status: true,
    },
    {
      id: 5,
      engineerCode: "FE005",
      engineerName: "Rakesh Patel",
      mobileNo: "9888998877",
      employmentType: "FULL_TIME",
      state: "Gujarat",
      baseLocation: "Ahmedabad",
      status: false,
    },
  ]);

  /* =====================
     STATUS TOGGLE (FIXED)
     ===================== */
  const handleToggle = (id) => {
    setEngineers((prev) =>
      prev.map((eng) =>
        eng.id === id ? { ...eng, status: !eng.status } : eng
      )
    );
  };

  /* =====================
     SORTING STATE
     ===================== */
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  /* =====================
     SORTED DATA
     ===================== */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return engineers;

    return [...engineers].sort((a, b) => {
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
  }, [engineers, sortConfig]);

  /* =====================
     PAGINATION
     ===================== */
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

  /* =====================
     SORT ICON
     ===================== */
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <div className="fe-table-wrapper">
      <div className="card fe-table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("engineerCode")}>
                Engineer Code <SortIcon column="engineerCode" />
              </th>
              <th onClick={() => handleSort("engineerName")}>
                Engineer Name <SortIcon column="engineerName" />
              </th>
              <th onClick={() => handleSort("mobileNo")}>
                Mobile No <SortIcon column="mobileNo" />
              </th>
              <th onClick={() => handleSort("employmentType")}>
                Employment Type <SortIcon column="employmentType" />
              </th>
              <th onClick={() => handleSort("state")}>
                State <SortIcon column="state" />
              </th>
              <th onClick={() => handleSort("status")}>
                Status <SortIcon column="status" />
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((eng) => (
              <tr key={eng.id}>
                <td>{eng.engineerCode}</td>
                <td>{eng.engineerName}</td>
                <td>{eng.mobileNo}</td>
                <td>{eng.employmentType}</td>
                <td>{eng.state}</td>

                {/* ✅ WORKING STATUS TOGGLE */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={eng.status}
                      onChange={() => handleToggle(eng.id)}
                    />
                    <span className="slider" />
                  </label>
                </td>

                {/* ACTIONS: VIEW + EDIT */}
                <td>
                  {/* VIEW */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/engineers/view/${eng.id}`, {
                        state: eng,
                      })
                    }
                  >
                    <Eye size={16} />
                  </button>

                  {/* EDIT */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/engineers/edit/${eng.id}`, {
                        state: eng,
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

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
