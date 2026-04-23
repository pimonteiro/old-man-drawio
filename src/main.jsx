import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Force tldraw to treat the environment as development to prevent 
// the commercial license killswitch from unmounting the UI in production.
globalThis.__tldraw_isDevelopment = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
