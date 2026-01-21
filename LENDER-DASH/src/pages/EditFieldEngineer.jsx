import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import LenderPageHeader from "../components/LenderPageHeader";
import "./FieldEngineerForm.css";

export default function EditFieldEngineer() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [engineer, setEngineer] = useState({
        engineerCode: "",
        engineerName: "",
        mobileNo: "",
        emailId: "",
        aggregatorId: "",
        branchCode: "",
        employmentType: "",
        state: "",
        district: "",
        baseLocation: "",
        skillset: "",
        assignedDeviceCount: "",
        engineerStatus: "",
        joiningDate: "",
        lastWorkingDate: "",
        idProofType: "",
        idProofNumber: "",
        currentLatitude: "",
        currentLongitude: "",
        remarks: "",
        pincodes: [""],
    });

    useEffect(() => {
        if (location.state) {
            setEngineer({
                ...location.state,
                pincodes: location.state.pincodes || [""],
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        setEngineer({ ...engineer, [e.target.name]: e.target.value });
    };

    const handlePincodeChange = (index, value) => {
        const updated = [...engineer.pincodes];
        updated[index] = value;
        setEngineer({ ...engineer, pincodes: updated });
    };

    const addPincode = () => {
        setEngineer({ ...engineer, pincodes: [...engineer.pincodes, ""] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Field Engineer:", engineer);
        navigate("/engineers");
    };

    return (
        <div className="lender-form-page">
            <LenderPageHeader
                title="Field Engineer Master"
                breadcrumbLabel="Field Engineer > Edit"
            />

            <div className="edit-lender-page">
                <div className="card fe-card full-width">
                    <h2 className="edit-lender-title">Edit Field Engineer</h2>

                    <form className="fe-form" onSubmit={handleSubmit}>
                        {/* BASIC DETAILS */}
                        <section>
                            <h3>Basic Details</h3>
                            <div className="fe-grid">
                                <label>
                                    Engineer Code
                                    <input
                                        name="engineerCode"
                                        value={engineer.engineerCode}
                                        readOnly
                                        placeholder="Engineer Code"
                                    />
                                </label>

                                <label>
                                    Engineer Name
                                    <input
                                        name="engineerName"
                                        value={engineer.engineerName}
                                        onChange={handleChange}
                                        placeholder="Enter engineer name"
                                    />
                                </label>

                                <label>
                                    Mobile Number
                                    <input
                                        name="mobileNo"
                                        value={engineer.mobileNo}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                    />
                                </label>

                                <label>
                                    Email ID
                                    <input
                                        name="emailId"
                                        value={engineer.emailId}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </label>
                            </div>
                        </section>

                        {/* ORGANIZATION */}
                        <section>
                            <h3>Organization</h3>
                            <div className="fe-grid">
                                <label>
                                    Aggregator UUID
                                    <input
                                        name="aggregatorId"
                                        value={engineer.aggregatorId}
                                        onChange={handleChange}
                                        placeholder="Aggregator UUID"
                                    />
                                </label>

                                <label>
                                    Branch Code
                                    <input
                                        name="branchCode"
                                        value={engineer.branchCode}
                                        onChange={handleChange}
                                        placeholder="Branch Code"
                                    />
                                </label>

                                <label>
                                    Employment Type
                                    <select
                                        name="employmentType"
                                        value={engineer.employmentType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select employment type</option>
                                        <option value="FULL_TIME">Full Time</option>
                                        <option value="CONTRACT">Contract</option>
                                    </select>
                                </label>

                                <label>
                                    Engineer Status
                                    <select
                                        name="engineerStatus"
                                        value={engineer.engineerStatus}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select status</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                </label>
                            </div>
                        </section>

                        {/* LOCATION */}
                        <section>
                            <h3>Location</h3>
                            <div className="fe-grid">
                                <label>
                                    State
                                    <input
                                        name="state"
                                        value={engineer.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                    />
                                </label>

                                <label>
                                    District
                                    <input
                                        name="district"
                                        value={engineer.district}
                                        onChange={handleChange}
                                        placeholder="District"
                                    />
                                </label>

                                <label>
                                    Base Location
                                    <input
                                        name="baseLocation"
                                        value={engineer.baseLocation}
                                        onChange={handleChange}
                                        placeholder="Base location"
                                    />
                                </label>
                            </div>
                        </section>

                        {/* SKILLS */}
                        <section>
                            <h3>Skills & Devices</h3>
                            <div className="fe-grid">
                                <label>
                                    Skillset
                                    <input
                                        name="skillset"
                                        value={engineer.skillset}
                                        onChange={handleChange}
                                        placeholder="Skillset"
                                    />
                                </label>

                                <label>
                                    Assigned Device Count
                                    <input
                                        name="assignedDeviceCount"
                                        value={engineer.assignedDeviceCount}
                                        onChange={handleChange}
                                        placeholder="Number of devices"
                                    />
                                </label>
                            </div>
                        </section>

                        {/* PINCODES */}
                        <section>
                            <h3>Pincodes Served</h3>
                            <div className="fe-grid">
                                {engineer.pincodes.map((pin, index) => (
                                    <label key={index}>
                                        Pincode
                                        <input
                                            value={pin}
                                            placeholder="Enter pincode"
                                            onChange={(e) =>
                                                handlePincodeChange(index, e.target.value)
                                            }
                                        />
                                    </label>
                                ))}
                            </div>

                            <button type="button" className="add-btn" onClick={addPincode}>
                                + Add Pincode
                            </button>
                        </section>

                        {/* REMARKS */}
                        <section>
                            <h3>Remarks</h3>
                            <div className="fe-grid">
                                <label className="full-width">
                                    Remarks
                                    <textarea
                                        name="remarks"
                                        value={engineer.remarks}
                                        placeholder="Enter remarks"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </section>

                        {/* ACTIONS */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="secondary"
                                onClick={() => navigate("/engineers")}
                            >
                                Back
                            </button>

                            <button type="submit" className="submit-btn">
                                Update Engineer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
