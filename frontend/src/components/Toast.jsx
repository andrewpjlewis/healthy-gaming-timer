import React from 'react';
import '../styles/Toast.css';

export default function Toast({ message, type = '', onClose }) {
  if (!message) return null;

  return (
    <div className={`toast ${type === 'error' ? 'toast-error' : ''} ${type === 'success' ? 'toast-success' : ''} ${type === 'info' ? 'toast-info' : ''}`}>
      <span>{message}</span>
      <button 
        className="toast-close-button" 
        aria-label="Close notification" 
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}