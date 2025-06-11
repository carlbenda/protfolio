import React, { useState } from 'react';
import { AdminCredentials } from '../../types';
import { XIcon } from '../icons/MenuIcons';

interface LoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
  credentials: AdminCredentials;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose, credentials }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username === credentials.username && password === credentials.password) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-admin-border rounded-lg shadow-sm focus:ring-admin-primary focus:border-admin-primary transition-colors bg-admin-secondary-bg text-admin-text placeholder-admin-muted-text";
  const labelClass = "block text-sm font-medium text-admin-text mb-1";

  return (
    <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-dialog-title"
    >
      <div className="bg-admin-secondary-bg p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md border border-admin-border">
        <div className="flex justify-between items-center mb-6">
            <h2 id="login-dialog-title" className="text-xl sm:text-2xl font-semibold text-admin-text">Admin Login</h2>
            <button 
                onClick={onClose} 
                className="text-admin-muted-text hover:text-admin-text p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close login dialog"
            >
                <XIcon className="w-6 h-6" />
            </button>
        </div>
        
        {error && <p className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className={labelClass}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-admin-primary hover:bg-admin-primary-hover focus:ring-4 focus:ring-admin-primary/50 transition-colors disabled:opacity-60"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;