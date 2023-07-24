import React from 'react'
import Calendar from '../components/home/calendar/Calendar'
import ListView from '../components/home/listView/ListView'
import DetailView from '../components/home/detailView/DetailView'
import Sidebar from '../components/home/sidebar/Sidebar'

const Home = () => {
  return (
    <main className='home-page'>
      <Sidebar />
      <Calendar />
        {/* <div className='schedule-detail'>
          <DetailView />
          <ListView />
        </div> */}
    </main>
  )
}

export default React.memo(Home)