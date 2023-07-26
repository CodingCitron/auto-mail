import React from 'react'
import Calendar from '../components/home/calendar/Calendar'
import HomeLaytout from '../layouts/HomeLaytout'

const Home = () => {
  return (
    <HomeLaytout>
      <Calendar />
    </HomeLaytout>
  )
}

export default React.memo(Home)