import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Mail } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('employee'); // Default to employee
    const [identifier, setIdentifier] = useState(''); // This handles Email or ID
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // --- MOCK AUTHENTICATION LOGIC ---
        // In a real app, this data would go to your Node.js backend

        if (role === 'admin') {
            // Admin Check: Strict HR Email
            if (identifier === 'hr@attendo.com' && password === 'admin123') {
                localStorage.setItem('userRole', 'admin'); // Save role to browser
                navigate('/admin');
            } else {
                setError('Invalid Admin Credentials (Try: hr@attendo.com / admin123)');
            }
        } else {
            // Employee Check: ID or Email
            // Accepting "EMP01" or "emp@attendo.com" for testing
            if ((identifier === 'EMP01' || identifier === 'emp@attendo.com') && password === 'emp123') {
                localStorage.setItem('userRole', 'employee'); // Save role to browser
                navigate('/employee');
            } else {
                setError('Invalid Employee Credentials (Try: EMP01 / emp123)');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendo</h1>
                    <p className="text-gray-500">
                        {role === 'admin' ? 'Admin Access Portal' : 'Employee Attendance Portal'}
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Role Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'employee' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => { setRole('employee'); setIdentifier(''); setError(''); }}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === 'admin' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => { setRole('admin'); setIdentifier(''); setError(''); }}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Dynamic Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {role === 'admin' ? 'HR Email Address' : 'Employee ID or Email'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {role === 'admin' ? <Mail size={18} className="text-gray-400" /> : <User size={18} className="text-gray-400" />}
                            </div>
                            <input
                                type={role === 'admin' ? "email" : "text"}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                placeholder={role === 'admin' ? "hr@attendo.com" : "e.g. EMP-01 or name@mail.com"}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                    >
                        Login as {role === 'admin' ? 'Admin' : 'Employee'} <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;