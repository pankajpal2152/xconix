import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Shield, Activity, Lock } from 'lucide-react';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'EMPLOYEE',
    status: 'ACTIVE'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch data from LocalStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees_data')) || [];
    const employee = storedEmployees.find(e => e.id === id);
    
    if (employee) {
      setFormData(employee);
    } else {
      alert("Employee not found!");
      navigate('/admin');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Update LocalStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees_data')) || [];
    const updatedEmployees = storedEmployees.map(emp => 
      emp.id === id ? { ...emp, ...formData } : emp
    );
    
    localStorage.setItem('employees_data', JSON.stringify(updatedEmployees));
    
    // 3. Redirect back to Admin Dashboard
    navigate('/admin'); 
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Employee Profile</h1>
            <p className="text-sm text-gray-500">Update account details and permissions.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section: Personal Info */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
              <User size={20} /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 gap-5">
              
              {/* ID Field (Read Only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  Employee ID <Lock size={12} className="text-gray-400"/>
                </label>
                <input 
                  value={id} 
                  disabled 
                  className="w-full px-4 py-2.5 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed" 
                />
                <p className="text-xs text-gray-400 mt-1">Employee ID cannot be changed.</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white" 
                    required 
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Shield size={14} className="text-indigo-500" /> Role
                  </label>
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer">
                    <option value="EMPLOYEE">Employee</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Activity size={14} className={formData.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'} /> Status
                  </label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.01]"
          >
            <Save size={20} /> Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;