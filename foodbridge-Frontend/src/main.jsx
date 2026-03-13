import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter> {/* wrap your app in browser router */}

  <StrictMode>
     <AuthContext>
    <UserContext>
    <App />
     </UserContext>
    </AuthContext>
  </StrictMode>
  
  </BrowserRouter>
)