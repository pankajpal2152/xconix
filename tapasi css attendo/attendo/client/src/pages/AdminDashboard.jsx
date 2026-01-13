import React, { useEffect, useState } from 'react';
import { LogOut, Users, Calendar, Plus, Search, Filter, Edit2, Trash2, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'employees');
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

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

    const calculateWorkHours = (start, end) => {
        if (!start || !end) return 'Active';
        let diff = new Date(end) - new Date(start);
        if (diff < 0) diff += 24 * 60 * 60 * 1000;
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
            setFilteredAttendance(mergedLogs);
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

    const applyFilter = () => {
        let filtered = [...attendance];

        if (fromDate) {
            const from = new Date(fromDate);
            filtered = filtered.filter(att => new Date(att.date) >= from);
        }
        if (toDate) {
            const to = new Date(toDate);
            filtered = filtered.filter(att => new Date(att.date) <= to);
        }

        setFilteredAttendance(filtered);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                
                <div className="p-6 relative z-10">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Attendo</span>
                        <span className="text-[10px] bg-gradient-to-r from-indigo-500 to-purple-500 px-2.5 py-1 rounded-full ml-1 text-white font-semibold uppercase tracking-wider shadow-lg shadow-indigo-500/30">Admin</span>
                    </h1>
                    <p className="text-slate-500 text-xs mt-1">Workforce Management</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6 relative z-10">
                    <button
                        onClick={() => setActiveTab('employees')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${
                            activeTab === 'employees' 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/40 scale-[1.02]' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                        }`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'employees' ? 'bg-white/20' : 'bg-slate-700/50'}`}>
                            <Users size={18} />
                        </div>
                        Employees
                    </button>
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${
                            activeTab === 'attendance' 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/40 scale-[1.02]' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                        }`}
                    >
                        <div className={`p-2 rounded-xl ${activeTab === 'attendance' ? 'bg-white/20' : 'bg-slate-700/50'}`}>
                            <Calendar size={18} />
                        </div>
                        Attendance Logs
                    </button>
                </nav>

                <div className="p-4 mx-4 mb-4 bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-2xl border border-slate-700/50 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                            A
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm">Admin User</p>
                            <p className="text-slate-500 text-xs">Super Admin</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                                {activeTab === 'employees' ? 'Employee Management' : 'Attendance Report'}
                            </h2>
                            <Sparkles className="text-indigo-500 animate-pulse" size={24} />
                        </div>
                        <p className="text-gray-500 text-sm">
                            {activeTab === 'employees' ? 'Manage and organize your team effectively' : 'Track daily activity, status, and working hours'}
                        </p>
                    </div>

                    {activeTab === 'employees' ? (
                        <button
                            onClick={() => navigate('/admin/add-employee')}
                            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Add Employee
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/admin/add-attendance')}
                            className="group flex items-center gap-2 bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-100 transition-all duration-300 hover:scale-105"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Add Log
                        </button>
                    )}
                </header>

                {/* Filter Bar */}
                {activeTab === 'attendance' && (
                    <div className="bg-white/70 backdrop-blur-xl p-5 mb-6 rounded-3xl flex flex-wrap items-center gap-4 border border-white shadow-xl shadow-indigo-100/50">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                            <label className="text-gray-500 text-sm font-medium">From:</label>
                            <input 
                                type="date" 
                                value={fromDate} 
                                onChange={e => setFromDate(e.target.value)} 
                                className="bg-transparent border-none outline-none text-gray-700 font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                            <label className="text-gray-500 text-sm font-medium">To:</label>
                            <input 
                                type="date" 
                                value={toDate} 
                                onChange={e => setToDate(e.target.value)} 
                                className="bg-transparent border-none outline-none text-gray-700 font-medium"
                            />
                        </div>
                        <button 
                            onClick={applyFilter} 
                            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 font-medium"
                        >
                            <Filter size={16} /> Apply Filter
                        </button>
                        <button 
                            onClick={() => { setFromDate(''); setToDate(''); setFilteredAttendance(attendance); }} 
                            className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
                        >
                            Reset
                        </button>
                    </div>
                )}

                {/* Table Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 border border-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed text-left">
                            <thead className="bg-gradient-to-r from-gray-50 to-indigo-50/50">
                                <tr>
                                    {activeTab === 'employees' ? (
                                        <>
                                            {/* Adjusted widths: ID(12%), Name(25%), Email(25%), Role(15%), Status(13%), Actions(10%) */}
                                            <th className="w-[12%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="w-[25%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="w-[25%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="w-[15%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="w-[13%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </>
                                    ) : (
                                        <>
                                            {/* Attendance Tab Widths */}
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="w-[15%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="w-[15%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="w-[8%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">In Time</th>
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Out Time</th>
                                            <th className="w-[12%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Work Hours</th>
                                            <th className="w-[10%] px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/80 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" className="p-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                                <span className="text-gray-500 font-medium">Loading data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : activeTab === 'employees' ? (
                                    employees.map((emp, index) => (
                                        <tr 
                                            key={emp.id} 
                                            className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-6 py-5 font-mono text-gray-400 text-xs bg-gray-50/50 group-hover:bg-transparent transition-colors truncate">{emp.id}</td>
                                            <td className="px-6 py-5 font-semibold text-gray-800 flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <span className="group-hover:text-indigo-700 transition-colors truncate">{emp.name}</span>
                                            </td>
                                            <td className="px-6 py-5 text-gray-500 truncate">{emp.email}</td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 shadow-sm">
                                                    {emp.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border shadow-sm inline-flex items-center gap-1.5 ${
                                                    emp.status === 'ACTIVE' 
                                                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${emp.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button 
                                                        onClick={() => navigate(`/admin/edit-employee/${emp.id}`)} 
                                                        className="p-2.5 text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button className="p-2.5 text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    filteredAttendance.map((att, index) => (
                                        <tr 
                                            key={att.id} 
                                            className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-6 py-5 font-semibold text-gray-800">
                                                <span className="bg-gray-100 px-3 py-1.5 rounded-lg truncate block w-fit">
                                                    {new Date(att.date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-gray-800 font-semibold flex items-center gap-3 overflow-hidden">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-md flex-shrink-0">
                                                    {att.userName.charAt(0)}
                                                </div>
                                                <span className="truncate">{att.userName}</span>
                                            </td>
                                            <td className="px-6 py-5 text-gray-500 text-xs truncate">{att.userEmail}</td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs bg-gradient-to-r from-slate-100 to-gray-100 px-3 py-1.5 rounded-lg text-gray-600 font-semibold border border-gray-200">
                                                    {att.userRole}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                                                    att.exitTime 
                                                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200' 
                                                        : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${att.exitTime ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                                                    {att.exitTime ? 'Done' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-emerald-600 font-mono font-bold bg-emerald-50 px-3 py-1.5 rounded-lg text-xs">
                                                    {new Date(att.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`font-mono font-bold px-3 py-1.5 rounded-lg text-xs ${att.exitTime ? 'text-red-600 bg-red-50' : 'text-gray-400 bg-gray-50'}`}>
                                                    {att.exitTime ? new Date(att.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="font-bold text-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 rounded-lg border border-indigo-100 text-xs">
                                                    {calculateWorkHours(att.entryTime, att.exitTime)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button 
                                                    onClick={() => navigate(`/admin/edit-attendance/${att.id}`)} 
                                                    className="px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl font-semibold text-xs flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 ml-auto"
                                                >
                                                    <Edit2 size={14} /> Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            Showing <span className="font-semibold text-gray-700">{activeTab === 'employees' ? employees.length : filteredAttendance.length}</span> records
                        </p>
                        <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleString()}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;