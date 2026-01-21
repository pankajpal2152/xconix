import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

/* =====================
   DUMMY LENDERS
   ===================== */
const LENDERS = [
    { id: "lnd-1", name: "HDFC Bank" },
    { id: "lnd-2", name: "ICICI Bank" },
    { id: "lnd-3", name: "Bajaj Finance" },
];

/* =====================
   DEFAULT MODEL
   ===================== */
const EMPTY_BRANCH = {
    id: "",
    lenderId: "",
    branchCode: "",
    branchName: "",
    branchType: "",
    contactPersonName: "",
    contactMobile: "",
    contactEmail: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    latitude: "",
    longitude: "",
    locationUpdatedAt: "",
    billingApplicable: false,
    status: "",
    remarks: "",
    createdAt: "",
    updatedAt: "",
};

export default function EditLenderBranch() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        ...EMPTY_BRANCH,
        id,
    });

    useEffect(() => {
        if (location.state) {
            setFormData({
                ...EMPTY_BRANCH,
                ...location.state,
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isEdit ? "Updated Branch:" : "Created Branch:", formData);
        navigate("/lender-branches");
    };

    return (
        <div className="lender-form-page">
            {/* ✅ DYNAMIC PAGE HEADER */}
            <LenderPageHeader
                title="Lender Branch"
                breadcrumbLabel="Lender Branch"
            />

            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">
                        {isEdit ? "Edit Lender Branch" : "Add Lender Branch"}
                    </h2>

                    {/* ✅ TWO COLUMN FORM */}
                    <form className="edit-form two-column" onSubmit={handleSubmit}>
                        <label>
                            Lender
                            <select
                                name="lenderId"
                                value={formData.lenderId}
                                onChange={handleChange}
                            >
                                <option value="">Select Lender</option>
                                {LENDERS.map((l) => (
                                    <option key={l.id} value={l.id}>
                                        {l.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Branch Code
                            <input
                                name="branchCode"
                                value={formData.branchCode}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Branch Name
                            <input
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Branch Type
                            <select
                                name="branchType"
                                value={formData.branchType}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="PUBLIC">PUBLIC</option>
                                <option value="PRIVATE">PRIVATE</option>
                            </select>
                        </label>

                        <label>
                            Contact Person Name
                            <input
                                name="contactPersonName"
                                value={formData.contactPersonName}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Contact Mobile
                            <input
                                name="contactMobile"
                                value={formData.contactMobile}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Contact Email
                            <input
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Address
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            State
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            District
                            <input
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Pincode
                            <input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Latitude
                            <input
                                type="number"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Longitude
                            <input
                                type="number"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Location Updated At
                            <input
                                type="datetime-local"
                                name="locationUpdatedAt"
                                value={formData.locationUpdatedAt}
                                onChange={handleChange}
                            />
                        </label>

                        {/* ✅ INLINE BILLING */}
                        <div className="ld-inline-field">
                            <span className="ld-inline-label">Billing Applicable</span>
                            <input
                                type="checkbox"
                                name="billingApplicable"
                                checked={formData.billingApplicable}
                                onChange={handleChange}
                            />
                        </div>

                        <label>
                            Status
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </label>

                        <label>
                            Remarks
                            <input
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Created At
                            <input
                                type="datetime-local"
                                name="createdAt"
                                value={formData.createdAt}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Updated At
                            <input
                                type="datetime-local"
                                name="updatedAt"
                                value={formData.updatedAt}
                                onChange={handleChange}
                            />
                        </label>

                        {/* ✅ CENTERED ACTIONS */}
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate("/lender-branches")}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="primary">
                                {isEdit ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
