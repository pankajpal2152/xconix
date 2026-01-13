import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Clock, Briefcase } from 'lucide-react';

const AddEmployee = () => {
    const navigate = useNavigate();

    // State to hold all form data
    const [formData, setFormData] = useState({
        // Employee Fields
        id: '',
        name: '',
        email: '',
        role: 'EMPLOYEE',
        status: 'ACTIVE',

        // Attendance Fields (Optional)
        date: new Date().toISOString().slice(0, 10), // Default to Today
        entryTime: '',
        exitTime: ''
    });

    // ✅ FIXED: Dynamic Working Hours Calculation (Handles Overnight)
    const calculateWorkHours = () => {
        if (!formData.entryTime || !formData.exitTime) return '0h 0m';

        // Create Date objects using the selected Date + Time
        // Note: We use the same date for both initially
        const start = new Date(`${formData.date}T${formData.entryTime}`);
        const end = new Date(`${formData.date}T${formData.exitTime}`);

        let diff = end - start;

        // If difference is negative, it means the shift went overnight (past midnight)
        // So we add 24 hours (in milliseconds) to correct it.
        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        return `${hours}h ${mins}m`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.id.trim() || !formData.name.trim()) {
            alert("Employee ID and Name are required!");
            return;
        }

        // --- 1. SAVE EMPLOYEE DATA ---
        const newEmployee = {
            id: formData.id,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status
        };

        const storedEmps = JSON.parse(localStorage.getItem('employees_data')) || [];
        // Prevent duplicate IDs
        if (storedEmps.find(e => e.id === newEmployee.id)) {
            alert(`Employee ID ${newEmployee.id} already exists!`);
            return;
        }
        const updatedEmps = [...storedEmps, newEmployee];
        localStorage.setItem('employees_data', JSON.stringify(updatedEmps));

        // --- 2. SAVE ATTENDANCE DATA (If time is provided) ---
        if (formData.entryTime) {
            const makeIso = (dateStr, timeStr) => new Date(`${dateStr}T${timeStr}`).toISOString();

            let entryIso = makeIso(formData.date, formData.entryTime);
            let exitIso = formData.exitTime ? makeIso(formData.date, formData.exitTime) : null;

            // Handle overnight shift saving: If Exit < Entry, shift Exit to next day
            if (entryIso && exitIso && new Date(exitIso) < new Date(entryIso)) {
                const exitDateObj = new Date(exitIso);
                exitDateObj.setDate(exitDateObj.getDate() + 1);
                exitIso = exitDateObj.toISOString();
            }

            const newLog = {
                id: 'LOG' + Date.now(),
                userId: formData.id, // Link log to the new employee
                // Force local midnight to prevent date shifting
                date: new Date(formData.date + 'T00:00:00').toISOString(),
                entryTime: entryIso,
                exitTime: exitIso,
                rssi: '-Initial-'
            };

            const storedLogs = JSON.parse(localStorage.getItem('attendance_data')) || [];
            const updatedLogs = [newLog, ...storedLogs]; // Add to top
            localStorage.setItem('attendance_data', JSON.stringify(updatedLogs));
        }

        // --- 3. FINISH ---
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl">

                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Onboard New Employee</h1>
                        <p className="text-sm text-gray-500">Create account and add initial attendance record.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Personal Info */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                            <User size={20} /> Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Employee ID</label>
                                <input name="id" value={formData.id} onChange={handleChange} placeholder="e.g. XCEM005" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                                    <option value="EMPLOYEE">Employee</option>
                                    <option value="HR">HR</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Account Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Initial Attendance */}
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                        <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                            <Clock size={20} /> Initial Attendance (Optional)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">In Time</label>
                                <input type="time" name="entryTime" value={formData.entryTime} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Out Time</label>
                                <input type="time" name="exitTime" value={formData.exitTime} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" />
                            </div>
                        </div>

                        {/* Working Hours Display */}
                        <div className="mt-5 flex items-center justify-between p-4 bg-white rounded-lg border border-indigo-100 shadow-sm">
                            <div className="flex items-center gap-2 text-indigo-900">
                                <Briefcase size={18} />
                                <span className="font-medium">Total Working Hours:</span>
                            </div>
                            <span className="text-xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                                {calculateWorkHours()}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.01]"
                    >
                        <Save size={20} /> Save Employee & Record
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;