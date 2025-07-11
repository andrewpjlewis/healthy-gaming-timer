import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function GoalList() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    api.get('/api/goals').then((res) => setGoals(res.data));
  }, []);

  return (
    <div className='container'>
      <h2>Your Health Goals</h2>
      {goals.map((goal) => (
        <div key={goal._id}>
          <strong>{goal.title}</strong> – {goal.progress}/{goal.target}
        </div>
      ))}
    </div>
  );
}