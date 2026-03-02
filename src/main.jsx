import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChallengeProvider } from './context/ChallengeContext' // Importe o Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChallengeProvider>
      <App />
    </ChallengeProvider>
  </React.StrictMode>,
)