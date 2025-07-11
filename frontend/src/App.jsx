import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SessionTimer from './components/SessionTimer';
import GoalList from './components/GoalList';
import ReminderSettings from './components/ReminderSettings';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css';

function App() {
  return (
    <div className='view'>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session" element={<SessionTimer />} />
        <Route path="/goals" element={<GoalList />} />
        <Route path="/reminders" element={<ReminderSettings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
