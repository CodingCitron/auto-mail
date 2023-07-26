import React from 'react'
import Sidebar from '../components/home/sidebar/Sidebar'

const HomeLaytout = ({ children }) => {
  return (
    <main className='home-page'>
      <Sidebar />  
      { children }
    </main>
    )
}

export default React.memo(HomeLaytout)