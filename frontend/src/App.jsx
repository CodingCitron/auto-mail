import BaseLayout from "./layouts/BaseLayout"
import Calendar from "./components/Calendar"
import PlanList from "./components/PlanList"
import PlanDetail from "./components/PlanDetail"
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <BaseLayout>
        <Calendar />
      </BaseLayout>
    </>
  )
}

export default App
