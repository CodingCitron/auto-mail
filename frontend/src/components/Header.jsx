import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/auth'
import axios from 'axios'

const Header = () => {
  const { authenticated, user } = useAuthState()
  const dispatch = useAuthDispatch()

  const handleLogout = async () => {
    try {
      const res = await axios.post("/user/logout")
      dispatch({ type: 'LOGOUT' })

      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  } 
  
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
          { authenticated ? (
            <>
              <button>{ user.email }</button>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          ) }             
        </div>
      </div>
    </header>
  )
}

export default Header