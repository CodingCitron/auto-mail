import BaseLayout from "./layouts/BaseLayout"
import Calendar from "./components/Calendar"
import Login from "./pages/Login"
import Reigster from './pages/Register'
import { Route, Routes } from "react-router-dom"
import { useAuthDispatch } from "./context/auth"
import axios from "axios"

function App() {
  const authDispacth = useAuthDispatch()

  async function loadUser() {
    try {
        const res = await axios.get("/user")

        if(res.data) {
          authDispacth("LOGIN", res.data)
        }
    } catch (error) {
        console.log(error)
    } finally {
      authDispacth("STOP_LOADING")
    }
  }

  loadUser() 

  return (
    <>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reigster />} />
        </Routes>
      </BaseLayout>
    </>
  )
}

export default App
{/* <Calendar /> */}