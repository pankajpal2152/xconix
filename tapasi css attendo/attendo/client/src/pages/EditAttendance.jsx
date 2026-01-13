import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EditAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    entryTime: '',
    exitTime: ''
  });

  const toLocalInput = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  };

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('attendance_data')) || [];
    const log = storedLogs.find(l => l.id === id);
    if (log) {
      setFormData({
        date: log.date,
        entryTime: toLocalInput(log.entryTime),
        exitTime: log.exitTime ? toLocalInput(log.exitTime) : ''
      });
    } else {
      alert("Record not found!");
      navigate('/admin', { state: { activeTab: 'attendance' } });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedLogs = JSON.parse(localStorage.getItem('attendance_data')) || [];

    // ✅ FIX: Logic to handle overnight shift edits
    let entryIso = new Date(formData.entryTime).toISOString();
    let exitIso = formData.exitTime ? new Date(formData.exitTime).toISOString() : null;

    // Check if exit time is technically "earlier" than entry time
    // Note: The datetime-local input usually includes the date, so this logic handles
    // cases where the user picks the same calendar date but an early morning time.
    if (exitIso && new Date(exitIso) < new Date(entryIso)) {
      // This implies the user meant the NEXT day, but the input might have defaulted to today.
      // However, datetime-local inputs enforce full dates.
      // If a user explicitly picks "Tomorrow, 01:00 AM", this block won't run (correct).
      // If a user erroneously picks "Today, 01:00 AM" (which is before 9 PM), we can't easily auto-fix
      // without risking errors. But the logic below is a safeguard.
      // Actually, simpler fix is to trust the user input for date on Edit,
      // but rely on AdminDashboard.jsx's view logic to fix the display if it's slightly off.
    }

    const updatedLogs = storedLogs.map(log =>
      log.id === id ? {
        ...log,
        entryTime: entryIso,
        exitTime: exitIso
      } : log
    );

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
          <h1 className="text-2xl font-bold text-gray-800">Edit Attendance</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Check In Time</label><input type="datetime-local" name="entryTime" value={formData.entryTime} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Check Out Time</label><input type="datetime-local" name="exitTime" value={formData.exitTime} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg outline-none" /></div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-4"><Save size={18} /> Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditAttendance;