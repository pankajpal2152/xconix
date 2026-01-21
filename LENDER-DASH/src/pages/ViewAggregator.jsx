import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css"; // reuse same spacing & card styles

/* =====================
   DUMMY FIELD ENGINEERS
   ===================== */
const ALL_FIELD_ENGINEERS = [
    { id: 1, name: "Rahul Das", mobile: "9876543210", region: "West Bengal", active: true },
    { id: 2, name: "Amit Singh", mobile: "9123456780", region: "Bihar", active: true },
    { id: 3, name: "Sourav Pal", mobile: "9988776655", region: "Odisha", active: false },
    { id: 4, name: "Ravi Kumar", mobile: "9090909090", region: "Jharkhand", active: true },
];

export default function ViewAggregator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [aggregator, setAggregator] = useState(location.state || {});
    const [mappedEngineers, setMappedEngineers] = useState([]);

    /* =====================
       LOAD MAPPED ENGINEERS
       ===================== */
    useEffect(() => {
        // 🔜 Later replace with API
        setMappedEngineers([ALL_FIELD_ENGINEERS[0], ALL_FIELD_ENGINEERS[1]]);
    }, []);

    /* =====================
       MAP / UNMAP HANDLERS
       ===================== */
    const handleMap = (engineer) => {
        if (mappedEngineers.find((e) => e.id === engineer.id)) return;
        setMappedEngineers((prev) => [...prev, engineer]);
    };

    const handleUnmap = (id) => {
        setMappedEngineers((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div className="lender-form-page">
            {/* ✅ FIX: BREADCRUMB = Home > Aggregator > View */}
            <LenderPageHeader
                title="Aggregator Master"
                breadcrumbLabel="Aggregator > View"
            />

            {/* =====================
               AGGREGATOR DETAILS
               ===================== */}
            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">Aggregator Details</h2>

                    <div className="edit-form">
                        <label>
                            Aggregator ID
                            <input value={id} disabled />
                        </label>

                        <label>
                            Aggregator Name
                            <input value={aggregator.aggregatorName || "—"} disabled />
                        </label>

                        <label>
                            Aggregator Code
                            <input value={aggregator.aggregatorCode || "—"} disabled />
                        </label>

                        <label>
                            State
                            <input value={aggregator.state || "—"} disabled />
                        </label>

                        <label>
                            District
                            <input value={aggregator.district || "—"} disabled />
                        </label>

                        <label>
                            Status
                            <input value={aggregator.aggregatorStatus || "—"} disabled />
                        </label>
                    </div>
                </div>
            </div>

            {/* =====================
               FIELD ENGINEER MAPPING
               ===================== */}
            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">Mapped Field Engineers</h2>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Region</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mappedEngineers.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "16px" }}>
                                        No Field Engineers mapped
                                    </td>
                                </tr>
                            )}

                            {mappedEngineers.map((fe) => (
                                <tr key={fe.id}>
                                    <td>{fe.name}</td>
                                    <td>{fe.mobile}</td>
                                    <td>{fe.region}</td>
                                    <td>{fe.active ? "Active" : "Inactive"}</td>
                                    <td>
                                        <button
                                            className="icon-btn"
                                            onClick={() => handleUnmap(fe.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* =====================
               MAP NEW FIELD ENGINEER
               ===================== */}
            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">Map Field Engineer</h2>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Region</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ALL_FIELD_ENGINEERS.map((fe) => (
                                <tr key={fe.id}>
                                    <td>{fe.name}</td>
                                    <td>{fe.mobile}</td>
                                    <td>{fe.region}</td>
                                    <td>
                                        <button
                                            className="icon-btn"
                                            onClick={() => handleMap(fe)}
                                        >
                                            Map
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate("/aggregators")}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
