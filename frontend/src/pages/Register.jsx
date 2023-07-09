import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useAuthState } from '../context/auth'
import InputGroup from '../components/InputGroup'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { authenticated } = useAuthState()
  if(authenticated) navigate('/')

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    registerAPI()
    
  }, [])

  function registerAPI (data) {
    return axios.post('/user/register', data)
  }

  return (
    <main className='mt-[16px] center flex-1 flex-col'>
      <div className='w-[400px]'>
      <h3 className='w-full'>회원가입</h3>
        <form onSubmit={onSubmit}>
          <InputGroup
            className="mb-2" 
            type="text" 
            value={email}
            setValue={setEmail} 
            placeholder="이메일" 
          />
          <button>test</button>
        </form>
      </div>
    </main>
  )
}

export default Register