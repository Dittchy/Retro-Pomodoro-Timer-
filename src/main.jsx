import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Remove debug overlay if it exists
const debugOverlay = document.getElementById('bundle-status')?.parentNode;
if (debugOverlay) {
  debugOverlay.style.display = 'none';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
