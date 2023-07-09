import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {


  return (
    <main className='mt-[16px] center flex-1 flex-col'>
      <div className='w-[400px]'>
        <h3 className='w-full'>로그인</h3>
        <form className='block'>
          <div>
            <div>
              <label>아이디</label>
            </div>
            <div>
              <input type='text' className='input' placeholder='아이디' />
            </div>
          </div>
          <div>
            <div>
              <label>비밀번호</label>
            </div>
            <div>
              <input type='text' className='input' placeholder='비밀번호' />
            </div>
          </div>
          <div>
            <button>로그인</button>
            <Link to="/register">회원가입</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login