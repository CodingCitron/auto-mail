import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "./store/auth"
import axios from "axios"

// 컴포넌트
import BaseLayout from "./layouts/BaseLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Reigster from './pages/Register'
import Modals from './components/common/Modals'

const PrivateRoute = ({ children }) => {
  const user = useAuthStore(state => state.user)

  if (!user.isLogin) {
    return <Navigate to="/login" replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const user = useAuthStore(state => state.user)

  if (user.isLogin) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { login } = useAuthStore(state => state)

  useEffect(() => {
    async function loadUser () {
      try {
        const res = await axios.get("/user")

        if(res.data) {
          login(res.data)
        }
      } catch (error) {
          console.log(error)
      } finally {
        // authDispacth({ type: 'STOP_LOADING' })
      }
    }

    loadUser()
  }, [])

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