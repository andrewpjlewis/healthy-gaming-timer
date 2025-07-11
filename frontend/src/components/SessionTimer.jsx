import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Toast from './Toast';

export default function SessionTimer() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const [elapsedMs, setElapsedMs] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  // Store toast as object with message and type
  const [toast, setToast] = useState({ message: '', type: '' });

  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');
    } else {
      return [
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
        milliseconds.toString().padStart(2, '0')
      ].join(':');
    }
  };

  const startTimer = async () => {
    if (isRunning) return;

    if (!sessionId) {
      try {
        const res = await api.post('/api/session/start');
        setSessionId(res.data.sessionId);
        setElapsedMs(0);
      } catch (error) {
        console.error('Failed to start session', error);
        setToast({ message: 'Failed to start session', type: 'error' });
        return;
      }
    }

    setIsRunning(true);
    const startTime = Date.now() - elapsedMs;

    intervalRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 50);
  };

  const pauseTimer = () => {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Function to save session data to backend
  const saveSession = async (sessionIdToSave, elapsedMsToSave) => {
    try {
      const durationInSeconds = Math.round(elapsedMsToSave / 1000);
      await api.post('/api/session/end', { sessionId: sessionIdToSave, duration: durationInSeconds });
      setToast({ message: 'Session saved!', type: 'success' });
    } catch (error) {
      console.error('Failed to end session', error);
      setToast({ message: 'Failed to save session.', type: 'error' });
    }
  };

  const stopTimer = () => {
    if (!sessionId) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);

    if (loggedIn) {
      saveSession(sessionId, elapsedMs);
      setSessionId(null);
      setElapsedMs(0);
    } else {
      setToast({ message: 'You must log in to save the session.', type: 'error' });
      setShowLoginPrompt(true);
    }
  };

  const discardSession = () => {
    setShowLoginPrompt(false);
    setSessionId(null);
    setElapsedMs(0);
    setToast({ message: 'Session discarded.', type: 'info' });
  };

  const loginToSave = () => {
    localStorage.setItem('pendingSession', JSON.stringify({ sessionId, elapsedMs }));
    setShowLoginPrompt(false);
    navigate('/login');
  };

  useEffect(() => {
    if (loggedIn) {
      const pending = localStorage.getItem('pendingSession');
      if (pending) {
        const { sessionId: pendingSessionId, elapsedMs: pendingElapsedMs } = JSON.parse(pending);
        saveSession(pendingSessionId, pendingElapsedMs);
        localStorage.removeItem('pendingSession');
        setSessionId(null);
        setElapsedMs(0);
        setToast({ message: 'Pending session saved after login!', type: 'success' });
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h2>Session Timer</h2>
      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>{formatTime(elapsedMs)}</div>
      <button onClick={startTimer} disabled={isRunning}>Start / Resume</button>
      <button onClick={pauseTimer} disabled={!isRunning} style={{ marginLeft: '0.5rem' }}>Pause</button>
      <button onClick={stopTimer} disabled={!sessionId} style={{ marginLeft: '0.5rem' }}>Stop (End)</button>
      <button
        onClick={() => {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          setSessionId(null);
          setElapsedMs(0);
          setShowLoginPrompt(false);
        }}
        style={{ marginLeft: '0.5rem' }}
      >
        Reset (Discard)
      </button>

      {showLoginPrompt && (
        <div style={{
          position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
          background: '#333', color: 'white', padding: '1rem 2rem', borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
          <p>You need to log in to save your session.</p>
          <button onClick={discardSession} style={{ marginRight: '1rem' }}>Discard Session</button>
          <button onClick={loginToSave}>Login & Save</button>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
        aria-live="assertive"
      />
    </div>
  );
}
