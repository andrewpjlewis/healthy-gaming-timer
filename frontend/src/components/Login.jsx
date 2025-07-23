import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email format';

    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token);
      setToast('Login successful! Redirecting...');
      setTimeout(() => {
        setToast('');
        navigate('/dashboard');
      }, 2000); // show toast for 2 seconds
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container' style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

        <div>
          <label>Email:</label><br />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label><br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      {/* Google OAuth login button */}
      <div style={{ textAlign: 'center' }}>
        <a href="https://healthy-gaming-timer.onrender.com/auth/google" style={{ textDecoration: 'none' }}>
          <button type="button" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Login with Google
          </button>
        </a>
      </div>

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
