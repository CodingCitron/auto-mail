import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import './assets/css/root.css'
import './assets/css/customDatePicker.css'
import './assets/css/calendar.css'
import './assets/css/button.css'
import './assets/css/layout.css'
import './assets/css/index.css'

import App from './App.jsx'
import axios from "axios"
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  // </React.StrictMode>
)
