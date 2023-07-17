import React from 'react'
import Calendar from '../components/home/calendar/Calendar'
import ListView from '../components/home/listView/ListView'

const Home = () => {
  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
          <Calendar />
        </div>
        <div>
          <ListView />
        </div>
    </main>
  )
}

export default React.memo(Home)