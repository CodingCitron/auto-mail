import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='inner-header'>
        <div>
            <h1 className='title'>
              <Link to="/">
                Web-Planner
              </Link>
            </h1>
        </div>
        <div className='right'>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>             
        </div>
      </div>
    </header>
  )
}

export default Header