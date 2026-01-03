import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx'

// Force Unregister SW for debugging/cleanup ensures fresh version
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <App />
//     </ErrorBoundary>
//   </React.StrictMode>,
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={{ color: 'white', padding: 20, fontSize: 30 }}>
    REACT IS ALIVE <br />
    VERSION: 3.0
  </div>
)
