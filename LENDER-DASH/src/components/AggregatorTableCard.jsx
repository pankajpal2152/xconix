import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, ArrowUp, ArrowDown } from "lucide-react";
import "../components/LenderTable.css"; // ✅ reuse same CSS


export default function AggregatorTableCard() {
    const navigate = useNavigate();

    /* =====================
       DUMMY DATA
       ===================== */
    const [aggregators, setAggregators] = useState([
        {
            id: 1,
            code: "AGG001",
            name: "Alpha Logistics",
            contact: "Ramesh Kumar",
            mobile: "9087643690",
            state: "West Bengal",
            district: "Kolkata",
            serviceType: "Warehouse",
            active: true,
        },
        {
            id: 2,
            code: "AGG002",
            name: "Beta Services",
            contact: "Amit Singh",
            mobile: "9876543210",
            state: "Bihar",
            district: "Patna",
            serviceType: "Field Support",
            active: false,
        },
        {
            id: 3,
            code: "AGG003",
            name: "Gamma Networks",
            contact: "Sourav Pal",
            mobile: "9988776655",
            state: "Odisha",
            district: "Bhubaneswar",
            serviceType: "Warehouse",
            active: true,
        },
    ]);

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
        if (!sortConfig.key) return aggregators;

        return [...aggregators].sort((a, b) => {
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
    }, [aggregators, sortConfig]);

    /* =====================
       PAGINATION
       ===================== */
    const rowsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

    /* =====================
       STATUS TOGGLE
       ===================== */
    const toggleStatus = (id) => {
        setAggregators((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return null;
        return sortConfig.direction === "asc" ? (
            <ArrowUp size={14} />
        ) : (
            <ArrowDown size={14} />
        );
    };

    return (
        <div className="lender-table-wrapper">
            <div className="card lender-table-card">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")}>
                                ID <SortIcon column="id" />
                            </th>
                            <th onClick={() => handleSort("code")}>
                                Code <SortIcon column="code" />
                            </th>
                            <th onClick={() => handleSort("name")}>
                                Aggregator Name <SortIcon column="name" />
                            </th>
                            <th onClick={() => handleSort("contact")}>
                                Contact Person <SortIcon column="contact" />
                            </th>
                            <th>Mobile</th>
                            <th onClick={() => handleSort("state")}>
                                State <SortIcon column="state" />
                            </th>
                            <th>District</th>
                            <th>Service Type</th>
                            <th onClick={() => handleSort("active")}>
                                Status <SortIcon column="active" />
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.code}</td>
                                <td>{row.name}</td>
                                <td>{row.contact}</td>
                                <td>{row.mobile}</td>
                                <td>{row.state}</td>
                                <td>{row.district}</td>
                                <td>{row.serviceType}</td>

                                {/* STATUS */}
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={row.active}
                                            onChange={() => toggleStatus(row.id)}
                                        />
                                        <span className="slider" />
                                    </label>
                                </td>

                                {/* ACTION */}
                                <td>
                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            navigate(`/aggregators/view/${row.id}`, { state: row })
                                        }
                                    >
                                        <Eye size={16} />
                                    </button>

                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            navigate(`/aggregators/edit/${row.id}`, { state: row })
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
