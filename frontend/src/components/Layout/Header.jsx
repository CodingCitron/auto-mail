import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuthStore } from '../../store/auth'
import { shallow } from 'zustand/shallow'

const Header = () => {
  const { user, logout } = useAuthStore(state => ({
    user: state.user,
    logout: state.logout
  }), shallow)

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.post("/user/logout")
      logout()

      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }, [])
  
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
          { user.isLogin ? (
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

export default React.memo(Header)