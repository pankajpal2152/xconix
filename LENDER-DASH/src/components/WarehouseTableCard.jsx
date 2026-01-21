import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Pencil, Eye, ArrowUp, ArrowDown } from "lucide-react";
import "./WarehouseTableCard.css";

export default function WarehouseTableCard() {
  const navigate = useNavigate();

  /* =====================
     DUMMY DATA (NOW MUTABLE)
     ===================== */
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      warehouseCode: "WH001",
      warehouseType: "MAIN",
      ownerType: "COMPANY",
      state: "West Bengal",
      district: "Kolkata",
      status: true,
    },
    {
      id: 2,
      warehouseCode: "WH002",
      warehouseType: "SUB",
      ownerType: "THIRD_PARTY",
      state: "Maharashtra",
      district: "Pune",
      status: false,
    },
    {
      id: 3,
      warehouseCode: "WH003",
      warehouseType: "MAIN",
      ownerType: "COMPANY",
      state: "Karnataka",
      district: "Bangalore",
      status: true,
    },
  ]);

  /* =====================
     STATUS TOGGLE (FIX)
     ===================== */
  const handleToggle = (id) => {
    setWarehouses((prev) =>
      prev.map((wh) =>
        wh.id === id ? { ...wh, status: !wh.status } : wh
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
    if (!sortConfig.key) return warehouses;

    return [...warehouses].sort((a, b) => {
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
  }, [warehouses, sortConfig]);

  /* =====================
     PAGINATION
     ===================== */
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const SortIcon = ({ column }) =>
    sortConfig.key === column ? (
      sortConfig.direction === "asc" ? (
        <ArrowUp size={14} />
      ) : (
        <ArrowDown size={14} />
      )
    ) : null;

  return (
    <div className="fe-table-wrapper">
      <div className="card fe-table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("warehouseCode")}>
                Warehouse Code <SortIcon column="warehouseCode" />
              </th>
              <th onClick={() => handleSort("warehouseType")}>
                Warehouse Type <SortIcon column="warehouseType" />
              </th>
              <th onClick={() => handleSort("ownerType")}>
                Owner Type <SortIcon column="ownerType" />
              </th>
              <th onClick={() => handleSort("state")}>
                State <SortIcon column="state" />
              </th>
              <th onClick={() => handleSort("district")}>
                District <SortIcon column="district" />
              </th>
              <th onClick={() => handleSort("status")}>
                Status <SortIcon column="status" />
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((wh) => (
              <tr key={wh.id}>
                <td>{wh.warehouseCode}</td>
                <td>{wh.warehouseType}</td>
                <td>{wh.ownerType}</td>
                <td>{wh.state}</td>
                <td>{wh.district}</td>

                {/* ✅ WORKING TOGGLE */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={wh.status}
                      onChange={() => handleToggle(wh.id)}
                    />
                    <span className="slider" />
                  </label>
                </td>

                {/* ACTIONS */}
                <td style={{ display: "flex", gap: "6px" }}>
                  {/* VIEW */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/warehouse/view/${wh.id}`, {
                        state: wh,
                      })
                    }
                  >
                    <Eye size={16} />
                  </button>

                  {/* EDIT */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/warehouse/edit/${wh.id}`, {
                        state: wh,
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
