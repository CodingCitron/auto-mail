import BaseLayout from "./layouts/BaseLayout"

import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthDispatch, useAuthState } from "./context/auth"
import axios from "axios"
import { useEffect } from "react"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Reigster from './pages/Register'
import Modals from "./components/Modals"

function App() {
  const authDispacth = useAuthDispatch()

  useEffect(() => {
    async function loadUser () {
      try {
        const res = await axios.get("/user")
  
        if(res.data) {
          authDispacth({ type: 'LOGIN', payload: res.data })
        }
      } catch (error) {
          console.log(error)
      } finally {
        authDispacth({ type: 'STOP_LOADING' })
      }
    }

    loadUser()
  }, [])

  const PrivateRoute = ({ children }) => {
    const { authenticated } = useAuthState()
  
    if (!authenticated) {
      return <Navigate to="/login" replace />
    }
  
    return children
  }

  const PublicRoute = ({ children }) => {
    const { authenticated } = useAuthState()
  
    if (authenticated) {
      return <Navigate to="/" replace />
    }
  
    return children
  }

  return (
    <>
      <BaseLayout>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Reigster />
              </PublicRoute>
          } 
          />
        </Routes>
        <Modals />
      </BaseLayout>
    </>
  )
}

export default App
{/* <Calendar /> */}