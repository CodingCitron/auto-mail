import React, { useCallback, useState } from 'react'
import axios from 'axios'
import InputGroup from '../components/common/InputGroup'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()
    const { email, password, confirmPassword } = e.currentTarget 

    try {
      const res = await axios.post('/user/register', {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      })

      // console.log(res)
      navigate('/login')
    } catch (error) {
      console.error(error)
      setErrors(error.response.data || {})
    }
  }, [errors])

  return (
    <main className='register-page'>
      <div className='w-[400px]'>
      <h3 className='w-full mb-3 font-semibold text-[18px]'>회원가입</h3>
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
          <InputGroup
            className="mb-2" 
            type="password"
            name="confirmPassword" 
            error={errors.confirmPassword}
            placeholder="비밀번호 확인" 
          />
          <button className='btn-normal mb-2 p-2 w-full'>가입하기</button>
          <Link to='/'className='btn-normal p-2'>취소</Link>
        </form>
      </div>
    </main>
  )
}

export default React.memo(Register)