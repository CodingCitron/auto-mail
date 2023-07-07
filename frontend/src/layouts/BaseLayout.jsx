import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BaseLayout = ({ children }) => {
  return (
    <div className='base-layout'>
        <Header />
          { children }
        <Footer />
    </div>
  )
}

export default BaseLayout