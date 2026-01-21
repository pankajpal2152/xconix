import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

/* =====================
   DEFAULT MODEL – AGGREGATOR
   ===================== */
const EMPTY_AGGREGATOR = {
    id: "",
    aggregatorCode: "",
    aggregatorName: "",
    contactPersonName: "",
    contactMobile: "",
    contactEmail: "",
    officeAddress: "",
    state: "",
    district: "",
    serviceCoverage: "",
    serviceType: "",
    tatHours: "",
    ldApplicable: false,
    ldPercentageCap: "",
    billingCycle: "",
    paymentTermsDays: "",
    contractStartDate: "",
    contractEndDate: "",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    gstNumber: "",
    panNumber: "",
    aggregatorStatus: "",
    remarks: "",
    createdAt: "",
    updatedAt: "",
};

export default function EditAggregator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        ...EMPTY_AGGREGATOR,
        id,
    });

    /* =====================
       LOAD DATA (EDIT MODE)
       ===================== */
    useEffect(() => {
        if (location.state) {
            setFormData({
                ...EMPTY_AGGREGATOR,
                ...location.state,
            });
        }
    }, [location.state]);

    /* =====================
       HANDLE CHANGE
       ===================== */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isEdit ? "Updated Aggregator:" : "Created Aggregator:", formData);
        navigate("/aggregators");
    };

    return (
        <div className="lender-form-page">
            {/* ✅ FIX: CORRECT HEADER + BREADCRUMB */}
            <LenderPageHeader
                title="Aggregator Master"
                breadcrumbLabel="Aggregator"
            />

            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">
                        {isEdit ? "Edit Aggregator" : "Add Aggregator"}
                    </h2>

                    {/* ✅ TWO COLUMN FORM */}
                    <form className="edit-form two-column" onSubmit={handleSubmit}>
                        <label>
                            ID
                            <input value={formData.id} disabled />
                        </label>

                        <label>
                            Aggregator Code
                            <input name="aggregatorCode" value={formData.aggregatorCode} onChange={handleChange} />
                        </label>

                        <label>
                            Aggregator Name
                            <input name="aggregatorName" value={formData.aggregatorName} onChange={handleChange} />
                        </label>

                        <label>
                            Contact Person Name
                            <input name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
                        </label>

                        <label>
                            Contact Mobile
                            <input name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                        </label>

                        <label>
                            Contact Email
                            <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                        </label>

                        <label>
                            Office Address
                            <input name="officeAddress" value={formData.officeAddress} onChange={handleChange} />
                        </label>

                        <label>
                            District
                            <input name="district" value={formData.district} onChange={handleChange} />
                        </label>

                        <label>
                            State
                            <input name="state" value={formData.state} onChange={handleChange} />
                        </label>

                        <label>
                            Service Coverage
                            <input name="serviceCoverage" value={formData.serviceCoverage} onChange={handleChange} />
                        </label>

                        <label>
                            Service Type
                            <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="PUBLIC">PUBLIC</option>
                                <option value="PRIVATE">PRIVATE</option>
                            </select>
                        </label>

                        <label>
                            TAT Hours
                            <input type="number" name="tatHours" value={formData.tatHours} onChange={handleChange} />
                        </label>

                        <div className="ld-inline-field">
                            <span className="ld-inline-label">LD Applicable</span>
                            <input
                                type="checkbox"
                                name="ldApplicable"
                                checked={formData.ldApplicable}
                                onChange={handleChange}
                            />
                        </div>

                        <label>
                            LD Percentage Cap
                            <input
                                type="number"
                                step="0.01"
                                name="ldPercentageCap"
                                value={formData.ldPercentageCap}
                                onChange={handleChange}
                                disabled={!formData.ldApplicable}
                            />
                        </label>

                        <label>
                            Billing Cycle From
                            <input
                                type="datetime-local"
                                name="billing_from"
                                value={formData.billingCycle.from}
                                onChange={handleChange}
                            />
                        </label>

                        <div className="billing-cycle">
                            <label>
                                To
                                <input
                                    type="datetime-local"
                                    name="billing_to"
                                    value={formData.billingCycle.to}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <label>
                            Contract Start Date
                            <input type="datetime-local" name="contractStartDate" value={formData.contractStartDate} onChange={handleChange} />
                        </label>

                        <label>
                            End Date
                            <input type="datetime-local" name="contractEndDate" value={formData.contractEndDate} onChange={handleChange} />
                        </label>

                        <label>
                            Payment Terms Days
                            <input type="number" name="paymentTermsDays" value={formData.paymentTermsDays} onChange={handleChange} />
                        </label>

                        <label>
                            Bank Name
                            <input name="bankName" value={formData.bankName} onChange={handleChange} />
                        </label>

                        <label>
                            Bank Account No
                            <input name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} />
                        </label>

                        <label>
                            IFSC Code
                            <input name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
                        </label>

                        <label>
                            GST Number
                            <input name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                        </label>

                        <label>
                            PAN Number
                            <input name="panNumber" value={formData.panNumber} onChange={handleChange} />
                        </label>

                        <label>
                            Aggregator Status
                            <select name="aggregatorStatus" value={formData.aggregatorStatus} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </label>

                        <label>
                            Remarks
                            <input name="remarks" value={formData.remarks} onChange={handleChange} />
                        </label>

                        <label>
                            Created At
                            <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleChange} />
                        </label>

                        <label>
                            Updated At
                            <input type="datetime-local" name="updatedAt" value={formData.updatedAt} onChange={handleChange} />
                        </label>

                        <div className="form-actions">
                            <button type="button" onClick={() => navigate("/aggregators")}>
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
