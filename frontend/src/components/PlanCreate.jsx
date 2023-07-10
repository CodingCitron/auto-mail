import React, { useState } from 'react'
import ReactModal from 'react-modal'

// 리액트 모달 에러
// https://velog.io/@seungsang00/React-React-Modal
ReactModal.setAppElement('#root')

// react modal style
// https://reactcommunity.org/react-modal/styles/
const PlanCreate = ({ onSubmit, onClose }) => {
  const handleClickSubmit = () => {
    onSubmit()
  }

  const handleClickCancel = () => {
    onClose()
  }

  const [scheduleName, setScheduleName] = useState('')

  return (
    <>
      <ReactModal isOpen
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.15)'
          },
          content: {
            position: 'relative',
            inset: 'initial',
            // maxWidth: '400px',
            padding: '12px 16px',
            maxWidth: '600px',
            width: '100%',
          }
        }}
      >
        <header className='flex justify-between'>
          <div>
            <h3 className='text-[16px]'>일정등록</h3>
          </div>
          <div>
            <button onClick={handleClickCancel}>
              {/* 취소 */}
              <span className="material-icons">
                close
              </span>
            </button>
          </div>
        </header>
        <div className='mt-4'>
          {/* 일정명, 일시 */}
          <div className='mb-3'>
            <div className='flex gap-4 mb-3'>
              <h4 className='py-1 min-w-[50px] text-left'>일정명</h4>
              <input 
                type='text'
                value={scheduleName}
                onChange={e => setScheduleName(e.target.value)}
                className='border p-1 flex-1'
              />
            </div>
            <div className='flex gap-4'>
              <h4 className='py-1 min-w-[50px] text-left'>일시</h4>
              <input 
                type='text' 
                className='border p-1 flex-1'
              />
            </div>
          </div>
          {/* 상세 내용 */}
          <div> 
            <h4>일정상세</h4>
            <div>
              
            </div>
          </div>
          {/* 메일 보내기 기능 설정 */}
          <div>
            
          </div>
        </div>
        <footer>
          
        </footer>
      </ReactModal>
    </>
  )
}

export default PlanCreate