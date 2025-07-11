import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { loggedIn } = useAuth();
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [lastSession, setLastSession] = useState(null);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get('/auth/profile');
        setProfile(profileRes.data);

        const goalsRes = await api.get('/api/goals');
        setGoals(goalsRes.data);

        const sessionRes = await api.get('/api/session');
        const sorted = sessionRes.data.sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
        setLastSession(sorted[0]);

        const reminderRes = await api.get('/api/reminders');
        setReminders(reminderRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    };

    if (loggedIn) fetchData();
  }, [loggedIn]);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {profile?.username || 'Gamer'} 🎮</h2>

      {profile?.avatar && (
        <img src={profile.avatar} alt="Avatar" className="avatar" />
      )}

      <div className="dashboard-grid">
        <div className="card">
          <h3>Last Session</h3>
          {lastSession ? (
            <>
              <p>Duration: {formatDuration(lastSession.duration)}</p>
              <p>Ended: {new Date(lastSession.endTime).toLocaleString()}</p>
            </>
          ) : (
            <p>No sessions yet.</p>
          )}
        </div>

        <div className="card">
          <h3>Goals</h3>
          {goals.length === 0 ? (
            <p>No goals yet.</p>
          ) : (
            goals.map(goal => (
              <div key={goal._id} className="goal-item">
                <p>{goal.title}</p>
                <progress value={goal.progress} max={goal.target}></progress>
                <p>{goal.progress}/{goal.target}</p>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3>Reminders</h3>
          {reminders.length === 0 ? (
            <p>No active reminders.</p>
          ) : (
            reminders.map(reminder => (
              <div key={reminder._id}>
                <p>🔔 {reminder.message}</p>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3>Quick Action</h3>
          <button onClick={() => window.location.href = '/session'}>
            Start Session ⏱️
          </button>
        </div>
      </div>
    </div>
  );
}