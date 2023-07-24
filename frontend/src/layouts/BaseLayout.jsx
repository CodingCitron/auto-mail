import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const BaseLayout = ({ children }) => {
  return (
    <div className='base-layout'>
        <Header />
          <main className='contents-layout'>
            { children }
          </main>
        <Footer />
    </div>
  )
}

export default React.memo(BaseLayout)