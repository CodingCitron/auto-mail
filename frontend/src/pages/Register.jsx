import React, { useState } from 'react'
import axios from 'axios'
import InputGroup from '../components/Common/InputGroup'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/user/register', {
        email,
        password,
        confirmPassword
      })

      // console.log(res)
      navigate('/login')
    } catch (error) {
      console.error(error)
      setErrors(error.response.data || {})
    }
  }

  return (
    <main className='center flex-1 flex-col'>
      <div className='w-[400px]'>
      <h3 className='w-full mb-3 font-semibold text-[18px]'>회원가입</h3>
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
          <InputGroup
            className="mb-2" 
            type="password" 
            value={confirmPassword}
            setValue={setConfirmPassword} 
            error={errors.confirmPassword}
            placeholder="비밀번호 확인" 
          />
          <button className='btn-normal mb-2 p-2'>가입하기</button>
          <Link to='/'className='btn-normal p-2'>취소</Link>
        </form>
      </div>
    </main>
  )
}

export default Register