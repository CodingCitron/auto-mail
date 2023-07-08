import React, { useCallback } from 'react'
import BaseLayout from '../layouts/BaseLayout'
import axios from 'axios'

const Register = () => {
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    registerAPI()
    
  }, [])

  function registerAPI (data) {
    return axios.post('/user/register', data)
  }

  return (
    <BaseLayout>
        <main className='mt-[16px] center flex-1 flex-col'>
          <div className='w-[400px]'>
          <h3 className='w-full'>회원가입</h3>
            <form onSubmit={onSubmit}>
  
              <button>test</button>
            </form>
          </div>
        </main>
    </BaseLayout>
  )
}

export default Register