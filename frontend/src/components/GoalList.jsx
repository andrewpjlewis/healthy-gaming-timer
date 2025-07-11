import { useEffect, useState } from 'react';
import api from '../utils/api';
import confetti from 'canvas-confetti';

export default function GoalList() {
  const [goals, setGoals] = useState([]);
  const [suggestedGoals, setSuggestedGoals] = useState([
    "Take breaks regularly",
    "Drink water frequently",
    "Stretch every hour",
    "Maintain good posture",
    "Limit continuous gaming sessions to 2 hours"
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState(5);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/api/goals');
      setGoals(res.data);

      const currentTitles = res.data.map(g => g.title);
      setSuggestedGoals(sg => sg.filter(s => !currentTitles.includes(s)));
    } catch (err) {
      console.error('Failed to load goals', err);
    }
  };

  const addSuggestedGoal = async (title) => {
    try {
      await api.post('/api/goals', { title, target: 5 });
      fetchGoals();
    } catch (err) {
      console.error('Failed to add goal', err);
    }
  };

  // Increment progress by 1 and do mini confetti burst
  const incrementProgress = async (goal) => {
    try {
      const newProgress = Math.min(goal.progress + 1, goal.target);
      await api.put(`/api/goals/${goal._id}`, { progress: newProgress });
      fetchGoals();

      // Mini confetti burst
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.8 },
        scalar: 0.6
      });

      // Optionally, you can add bigger confetti on completion here.
      if (newProgress === goal.target) {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Failed to update goal progress', err);
    }
  };

  // Add new goal from form input
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalTarget) return;

    try {
      await api.post('/api/goals', { title: newGoalTitle, target: Number(newGoalTarget) });
      setNewGoalTitle('');
      setNewGoalTarget(5);
      fetchGoals();
    } catch (err) {
      console.error('Failed to add new goal', err);
    }
  };

  return (
    <div className='container'>
      <h2>Your Health Goals</h2>
      {goals.length === 0 && <p>No goals yet. Add some from suggestions below!</p>}

      {goals.map(goal => (
        <div key={goal._id} className="goal-item">
          <strong>{goal.title}</strong> – {goal.progress}/{goal.target}
          {!goal.completed && (
            <button onClick={() => incrementProgress(goal)} style={{ marginLeft: '10px' }}>
              +1 Progress
            </button>
          )}
          {goal.completed && <span style={{ marginLeft: '10px', color: 'green' }}>✅ Completed!</span>}
        </div>
      ))}

      <h3>Suggested Goals</h3>
      {suggestedGoals.length === 0 && <p>No more suggestions.</p>}
      <ul>
        {suggestedGoals.map((title, idx) => (
          <li key={idx}>
            {title} <button onClick={() => addSuggestedGoal(title)}>Add</button>
          </li>
        ))}
      </ul>

      <h3>Add New Goal</h3>
      <form onSubmit={handleAddGoal} style={{ marginTop: '1em' }}>
        <input
          type="text"
          placeholder="Goal title"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          required
          style={{ marginRight: '0.5em' }}
        />
        <input
          type="number"
          placeholder="Target"
          value={newGoalTarget}
          onChange={(e) => setNewGoalTarget(e.target.value)}
          min="1"
          required
          style={{ width: '5em', marginRight: '0.5em' }}
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}