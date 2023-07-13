import React from 'react'
import Calendar from '../components/Home/Calendar/Calendar'

const Home = () => {
  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            <Calendar />
        </div>
    </main>
  )
}

export default Home