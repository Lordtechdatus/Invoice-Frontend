import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/admin/login', { email, password });
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;
