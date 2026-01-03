import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// DEBUG MODE: Minimal Render
ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={{
    height: '100vh',
    background: 'blue',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  }}>
    DEBUG MODE ACTIVE<br />
    REACT IS WORKING
  </div>
)

/* 
// ORIGINAL CODE BACKUP
import App from './App.jsx'
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx'
// Force Unregister SW for debugging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
*/
