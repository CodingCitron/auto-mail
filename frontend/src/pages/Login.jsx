import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState, useAuthDispatch } from '../context/auth'
import InputGroup from '../components/InputGroup'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  const navigate = useNavigate()
  const dispatch = useAuthDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/user/login', {
        email,
        password,
      })

      // console.log(res.data)
      dispatch({ type: 'LOGIN', payload: res.data })
      navigate('/')
    } catch (error) {
      console.error(error)
      setErrors(error.response.data || {})
    }
  }
  
  return (
    <main className='mt-[16px] center flex-1 flex-col'>
      <div className='w-[400px]'>
        <h3 className='w-full mb-3 font-semibold text-[18px]'>로그인</h3>
        <form onSubmit={onSubmit}>
          <InputGroup
              className="mb-2" 
              type="email" 
              value={email}
              setValue={setEmail} 
              error={errors.email}
              placeholder="이메일" 
            />
            <InputGroup
              className="mb-2" 
              type="password" 
              value={password}
              setValue={setPassword} 
              error={errors.password}
              placeholder="비밀번호" 
            />
            <button className='btn-normal mb-2 p-2'>로그인</button>
            <Link to="/" className='btn-normal p-2'>취소</Link>
        </form>
      </div>
    </main>
  )
}

export default Login