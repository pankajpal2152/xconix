import React, { useEffect, useState } from 'react';
import { LogOut, Calendar, Clock, User, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DEMO USER SETTING ---
  const CURRENT_USER_ID = 'XCEM000002';

  // --- HELPERS ---
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    try { return format(new Date(isoString), 'hh:mm a'); } catch { return '--:--'; }
  };

  const calculateDuration = (start, end) => {
    if (!start) return '--';
    const startTime = new Date(start);
    // If no exit time (Active), use current time for live count
    const endTime = end ? new Date(end) : new Date();

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) return '--';

    let diff = endTime - startTime;
    if (diff < 0) diff += 24 * 60 * 60 * 1000; // Handle overnight shifts

    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${mins}m`;
  };

  // --- DATA LOADING FUNCTION ---
  const loadData = () => {
    const allEmployees = JSON.parse(localStorage.getItem('employees_data')) || [];
    const allAttendance = JSON.parse(localStorage.getItem('attendance_data')) || [];

    const myProfile = allEmployees.find(e => e.id === CURRENT_USER_ID);

    if (myProfile) {
      setUser(myProfile);
    } else {
      setUser({ name: "Rahul Roy (Demo)", role: "EMPLOYEE", id: CURRENT_USER_ID });
    }

    const myLogs = allAttendance.filter(log => log.userId === CURRENT_USER_ID);

    // Sort by Date (Newest First)
    myLogs.sort((a, b) => new Date(b.entryTime || b.date) - new Date(a.entryTime || a.date));

    setAttendance(myLogs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  // --- CALCULATIONS FOR UI ---
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // ✅ FIX: Robust Date Comparison using Local Time
  // We convert the stored UTC date to Local Date String before comparing
  const todayRecord = attendance.find(r => {
    if (!r.date) return false;
    try {
      // format() uses the local timezone of the browser
      const recordDateLocal = format(new Date(r.date), 'yyyy-MM-dd');
      return recordDateLocal === todayStr;
    } catch {
      return false;
    }
  });

  const getStatusInfo = (record) => {
    const status = record.status || (record.exitTime ? 'PRESENT' : 'ACTIVE');
    if (status === 'ABSENT') return { label: 'Absent', color: 'bg-red-100 text-red-600 border-red-200' };
    if (status === 'HALF_DAY') return { label: 'Half Day', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    if (status === 'ACTIVE') return { label: 'Active', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse' };
    return { label: 'Present', color: 'bg-green-100 text-green-700 border-green-200' };
  };

  const totalPresent = attendance.filter(r => !r.status || r.status === 'PRESENT' || r.status === 'ACTIVE').length;
  const totalHalfDays = attendance.filter(r => r.status === 'HALF_DAY').length;
  const totalAbsent = attendance.filter(r => r.status === 'ABSENT').length;

  if (loading) return <div className="h-screen flex items-center justify-center text-indigo-600 font-medium">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Clock className="w-8 h-8" /> Attendo
          </h1>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Employee'}</p>
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">Overview of your daily activity.</p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-indigo-100">
              {format(new Date(), 'MMM dd, yyyy')}
            </span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* Card 1: Today's Status */}
          <div className={`col-span-1 md:col-span-4 lg:col-span-2 p-6 rounded-2xl shadow-sm border transition-all ${todayRecord ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Today's Status</h3>
                <p className={`text-3xl font-bold mt-1 ${todayRecord ? 'text-green-700' : 'text-orange-500'}`}>
                  {todayRecord ? (todayRecord.exitTime ? 'Present' : 'Active') : 'Not Marked'}
                </p>
              </div>
              {todayRecord && (
                <div className="text-right">
                  <span className="block text-xs text-gray-400">Current Hours</span>
                  <span className="text-xl font-bold text-indigo-600">
                    {calculateDuration(todayRecord.entryTime, todayRecord.exitTime)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-8 text-sm pt-4 border-t border-gray-200/50">
              <div>
                <span className="block text-xs text-gray-400 mb-1">Punch In</span>
                <span className="font-mono font-semibold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                  {todayRecord ? formatTime(todayRecord.entryTime) : '--:--'}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Punch Out</span>
                <span className="font-mono font-semibold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                  {todayRecord ? formatTime(todayRecord.exitTime) : '--:--'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Total Present */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={20} /></div>
              <h3 className="text-gray-500 text-sm font-medium">Present Days</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalPresent}</p>
          </div>

          {/* Card 3: Half Days */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><AlertTriangle size={20} /></div>
              <h3 className="text-gray-500 text-sm font-medium">Half Days</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalHalfDays}</p>
          </div>

          {/* Card 4: Absent/Leaves */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg"><XCircle size={20} /></div>
              <h3 className="text-gray-500 text-sm font-medium">Absent / Leave</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalAbsent}</p>
          </div>
        </div>

        {/* Detailed Attendance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Attendance History (All Logs)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">In Time</th>
                  <th className="px-6 py-4">Out Time</th>
                  <th className="px-6 py-4">Working Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {attendance.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">No attendance history found.</td></tr>
                ) : (
                  attendance.map((record) => {
                    const { label, color } = getStatusInfo(record);
                    return (
                      <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {format(new Date(record.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
                            {label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-mono">{formatTime(record.entryTime)}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono">{formatTime(record.exitTime)}</td>
                        <td className="px-6 py-4 font-bold text-indigo-600">
                          {label === 'Absent' ? '-' : calculateDuration(record.entryTime, record.exitTime)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;