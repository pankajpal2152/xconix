import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';

const AddAttendance = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // 1. Get Today's Date in Local Format (YYYY-MM-DD)
  const getLocalDate = () => {
    const d = new Date();
    const offsetMs = d.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(d.getTime() - offsetMs);
    return localDate.toISOString().slice(0, 10);
  };

  const [formData, setFormData] = useState({
    userId: '',
    date: getLocalDate(),
    entryTime: '',
    exitTime: ''
  });

  useEffect(() => {
    const storedEmps = JSON.parse(localStorage.getItem('employees_data')) || [];
    setEmployees(storedEmps);
    if (storedEmps.length > 0) {
      setFormData(prev => ({ ...prev, userId: storedEmps[0].id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Helper: Construct ISO DateTime correctly
    const makeIso = (dateStr, timeStr) => {
      if (!timeStr) return null;
      return new Date(`${dateStr}T${timeStr}`).toISOString();
    };

    let entryIso = makeIso(formData.date, formData.entryTime);
    let exitIso = makeIso(formData.date, formData.exitTime);

    // 2. Handle Overnight Shift (If Out Time is earlier than In Time, add 1 day)
    if (entryIso && exitIso && new Date(exitIso) < new Date(entryIso)) {
      const exitDateObj = new Date(exitIso);
      exitDateObj.setDate(exitDateObj.getDate() + 1);
      exitIso = exitDateObj.toISOString();
    }

    const storedLogs = JSON.parse(localStorage.getItem('attendance_data')) || [];

    // 3. ROBUST DUPLICATE CHECK
    // We must convert the Saved Log's UTC date back to Local YYYY-MM-DD to compare correctly.
    const existingLogIndex = storedLogs.findIndex(log => {
      if (log.userId !== formData.userId) return false;

      // Convert Log Date (UTC) -> Local Date String
      const logDateObj = new Date(log.date);
      // Manually adjust for timezone to get the correct YYYY-MM-DD part
      const offsetMs = logDateObj.getTimezoneOffset() * 60 * 1000;
      const localLogDate = new Date(logDateObj.getTime() - offsetMs).toISOString().slice(0, 10);

      return localLogDate === formData.date;
    });

    let updatedLogs;

    if (existingLogIndex !== -1) {
      // --- UPDATE EXISTING ROW ---
      const existingLog = storedLogs[existingLogIndex];
      const updatedLog = {
        ...existingLog,
        entryTime: entryIso,
        exitTime: exitIso || null,
        rssi: '-Manual Update-'
      };
      updatedLogs = [...storedLogs];
      updatedLogs[existingLogIndex] = updatedLog;

    } else {
      // --- CREATE NEW ROW ---
      const newLog = {
        id: 'LOG' + Date.now(),
        userId: formData.userId,

        // 4. Force Date to be Local Midnight (prevents day shifting)
        date: new Date(formData.date + 'T00:00:00').toISOString(),

        entryTime: entryIso,
        exitTime: exitIso || null,
        rssi: '-Manual-'
      };

      // Add to top of list
      updatedLogs = [newLog, ...storedLogs];
    }

    localStorage.setItem('attendance_data', JSON.stringify(updatedLogs));
    navigate('/admin', { state: { activeTab: 'attendance' } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/admin', { state: { activeTab: 'attendance' } })} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add Attendance Log</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select name="userId" value={formData.userId} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">In Time</label>
              <input type="time" name="entryTime" value={formData.entryTime} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Out Time</label>
              <input type="time" name="exitTime" value={formData.exitTime} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-500/30 transition-all">
            <Save size={18} /> Save Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAttendance;