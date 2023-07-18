import React from 'react'
import Calendar from '../components/home/calendar/Calendar'
import ListView from '../components/home/listView/ListView'
import DetailView from '../components/home/detailView/DetailView'

const Home = () => {
  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
          <Calendar />
        </div>
        <div className='schedule-detail'>
          <ListView />
          <DetailView />
        </div>
    </main>
  )
}

export default React.memo(Home)