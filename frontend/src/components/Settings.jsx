import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const [sessions, setSessions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionsRes = await api.get('/api/session');
        const goalsRes = await api.get('/api/goals');
        setSessions(sessionsRes.data);
        setGoals(goalsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteSession = async (id) => {
    if (!window.confirm('Delete this session?')) return;
    try {
      await api.delete(`/api/session/${id}`);
      setSessions(s => s.filter(sess => sess._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGoal = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    try {
      await api.delete(`/api/goals/${id}`);
      setGoals(g => g.filter(goal => goal._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm('Are you sure you want to DELETE your account? This action is irreversible.')) return;
    try {
      await api.delete('/api/user/delete');
      // Optionally clear auth context / logout here, then redirect:
      alert('Account deleted. Goodbye!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Failed to delete account.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="settings-container">
      <h2>Manage Sessions</h2>
      {sessions.length === 0 && <p>No sessions found.</p>}
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            Started: {new Date(session.startTime).toLocaleString()}, Duration: {session.duration ? session.duration + 's' : 'In progress'}
            <button onClick={() => deleteSession(session._id)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Manage Goals</h2>
      {goals.length === 0 && <p>No goals found.</p>}
      <ul>
        {goals.map(goal => (
          <li key={goal._id}>
            {goal.title} — {goal.progress}/{goal.target} {goal.completed ? '✅' : ''}
            <button onClick={() => deleteGoal(goal._id)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '2rem', color: 'red' }}>Danger Zone</h2>
      <button
        onClick={deleteAccount}
        style={{ backgroundColor: 'red', color: 'white', padding: '1rem', border: 'none', cursor: 'pointer' }}
      >
        Delete My Account
      </button>
    </div>
  );
}