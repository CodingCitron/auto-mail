import React from 'react'
import Calendar from '../components/home/calendar/Calendar'

const Home = () => {
  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            <Calendar />
        </div>
    </main>
  )
}

export default React.memo(Home)