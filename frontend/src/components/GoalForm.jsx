import { useState } from 'react';
import api from '../utils/api';

export default function GoalForm({ onGoalAdded }) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !target) {
      setError('Title and target are required');
      return;
    }

    if (isNaN(target) || Number(target) <= 0) {
      setError('Target must be a positive number');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/api/goals', { title, target: Number(target) });
      setTitle('');
      setTarget('');
      onGoalAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add goal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
        className="goal-input"
      />
      <input
        type="number"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        disabled={loading}
        required
        min="1"
        className="goal-input target-input"
      />
      <button type="submit" disabled={loading} className="add-goal-btn">
        {loading ? 'Adding...' : 'Add Goal'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}