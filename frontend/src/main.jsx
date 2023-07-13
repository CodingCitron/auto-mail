import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-quill/dist/quill.snow.css'
import "react-datepicker/dist/react-datepicker.css"
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ModalProvider from './context/modal'
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
  // </React.StrictMode>
)
