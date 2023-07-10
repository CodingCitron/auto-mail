import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth'
import ModalProvider from './context/modal'
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  // </React.StrictMode>
)
