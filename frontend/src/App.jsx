import BaseLayout from "./layouts/BaseLayout"
import Calendar from "./components/Calendar"
import Login from "./pages/Login"
import Reigster from './pages/Register'
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthDispatch, useAuthState } from "./context/auth"
import axios from "axios"
import { useCallback, useEffect } from "react"

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
              <Calendar />
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
      </BaseLayout>
    </>
  )
}

export default App
{/* <Calendar /> */}