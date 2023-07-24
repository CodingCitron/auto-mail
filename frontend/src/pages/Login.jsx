import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputGroup from '../components/common/InputGroup'
import axios from 'axios'
import { useAuthStore } from '../store/auth'

const Login = () => {
  const [errors, setErrors] = useState('')

  // const navigate = useNavigate()
  const { login } = useAuthStore(state => state)

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
    const { email, password } = e.currentTarget

    try {
      const res = await axios.post('/user/login', {
        email: email.value,
        password: password.value,
      })

      login(res.data)
      // navigate('/')
    } catch (error) {
      console.error(error)
      setErrors(error.response.data || {})
    }
  }, [errors])

  const missingCredential = useMemo(() => {
    if(!errors.message) return

    return (
      <small className='font-medium negative mt-2'>
        { errors.message }
      </small>
    )
  }, [errors])

  return (
    <div className='login-page'>
      <div className='login-page-inner'>
        <h3 className='w-full mb-3 font-semibold text-[18px]'>로그인</h3>
        <form onSubmit={onSubmit}>
          <InputGroup
              className="mb-2" 
              type="email" 
              name="email"
              error={errors.email}
              placeholder="이메일" 
            />
            <InputGroup
              className="mb-2" 
              type="password" 
              name="password"
              error={errors.password}
              placeholder="비밀번호" 
            />
            <button className='btn-normal mb-2 p-2 w-full'>로그인</button>
            <Link to="/" className='btn-normal p-2'>취소</Link>
        </form>
        { missingCredential }
      </div>
    </div>
  )
}

export default React.memo(Login)