import React, { useEffect, useState } from 'react';
import { LogOut, Users, Calendar, Plus, Search, Filter, Edit2, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'employees');
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);

    const INITIAL_EMPLOYEES = [
        { id: 'XCEM000001', name: 'Suman Gope', email: 'suman@example.com', role: 'EMPLOYEE', status: 'ACTIVE' },
        { id: 'XCEM000002', name: 'Rahul Roy', email: 'rahul@example.com', role: 'EMPLOYEE', status: 'ACTIVE' },
        { id: 'XCEM000003', name: 'Priya Das', email: 'priya@example.com', role: 'HR', status: 'ACTIVE' },
        { id: 'XCEM000004', name: 'Amit Kumar', email: 'amit@example.com', role: 'EMPLOYEE', status: 'INACTIVE' },
    ];

    const getInitialLogs = () => {
        const now = new Date();
        const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
        return [
            { id: 'LOG001', userId: 'XCEM000001', date: now.toISOString(), entryTime: now.toISOString(), exitTime: null },
            { id: 'LOG002', userId: 'XCEM000002', date: now.toISOString(), entryTime: eightHoursAgo.toISOString(), exitTime: now.toISOString() },
        ];
    };

    // ✅ FIXED: Updated Calculation Logic
    const calculateWorkHours = (start, end) => {
        if (!start || !end) return 'Active';

        let diff = new Date(end) - new Date(start);

        // If negative, it means overnight shift (end time is next day)
        // We add 24 hours (in milliseconds) to fix the calculation
        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        return `${hours}h ${mins}m`;
    };

    const fetchData = async () => {
        setLoading(true);
        setTimeout(() => {
            let localEmps = JSON.parse(localStorage.getItem('employees_data'));
            if (!localEmps || localEmps.length === 0) {
                localEmps = INITIAL_EMPLOYEES;
                localStorage.setItem('employees_data', JSON.stringify(localEmps));
            }
            setEmployees(localEmps);

            let localLogs = JSON.parse(localStorage.getItem('attendance_data'));
            if (!localLogs || localLogs.length === 0) {
                localLogs = getInitialLogs();
                localStorage.setItem('attendance_data', JSON.stringify(localLogs));
            }

            const mergedLogs = localLogs.map(log => {
                const user = localEmps.find(e => e.id === log.userId) || {};
                return {
                    ...log,
                    userName: user.name || 'Unknown User',
                    userEmail: user.email || '-',
                    userRole: user.role || '-',
                    userStatus: user.status || '-'
                };
            });

            mergedLogs.sort((a, b) => new Date(b.entryTime || b.date) - new Date(a.entryTime || a.date));

            setAttendance(mergedLogs);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">

            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Attendo <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded ml-1">Admin</span>
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <button
                        onClick={() => setActiveTab('employees')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'employees' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Users size={20} /> Employees
                    </button>
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Calendar size={20} /> Attendance Logs
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {activeTab === 'employees' ? 'Employee Management' : 'Detailed Attendance Report'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {activeTab === 'employees' ? 'Manage your workforce' : 'Track daily activity, status, and working hours'}
                        </p>
                    </div>

                    {activeTab === 'employees' ? (
                        <button
                            onClick={() => navigate('/admin/add-employee')}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all"
                        >
                            <Plus size={18} /> Add Employee
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/admin/add-attendance')}
                            className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all"
                        >
                            <Plus size={18} /> Add Attendance Log
                        </button>
                    )}
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Search records..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                        </div>
                        <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                                <tr>
                                    {activeTab === 'employees' ? (
                                        <>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">In Time</th>
                                            <th className="px-6 py-4">Out Time</th>
                                            <th className="px-6 py-4">Work Hours</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {loading ? (
                                    <tr><td colSpan="10" className="p-8 text-center text-gray-500">Loading data...</td></tr>
                                ) : activeTab === 'employees' ? (
                                    employees.map(emp => (
                                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-gray-500 text-xs">{emp.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                {emp.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{emp.email}</td>
                                            <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">{emp.role}</span></td>
                                            <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${emp.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>{emp.status}</span></td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                <button onClick={() => navigate(`/admin/edit-employee/${emp.id}`)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    attendance.map(att => (
                                        <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{new Date(att.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-800 font-medium">{att.userName}</td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">{att.userEmail}</td>
                                            <td className="px-6 py-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{att.userRole}</span></td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${att.exitTime ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${att.exitTime ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                                    {att.exitTime ? 'Completed' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-green-600 font-mono">{new Date(att.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="px-6 py-4 text-red-600 font-mono">{att.exitTime ? new Date(att.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</td>

                                            {/* Calculated with new logic */}
                                            <td className="px-6 py-4 font-bold text-gray-700">{calculateWorkHours(att.entryTime, att.exitTime)}</td>

                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => navigate(`/admin/edit-attendance/${att.id}`)} className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 font-medium text-xs flex items-center gap-1">
                                                    <Edit2 size={14} /> Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;