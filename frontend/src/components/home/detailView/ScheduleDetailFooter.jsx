import React from 'react'

const ScheduleDetailFooter = ({ handleClickCancel }) => {
  return (
    <footer className='scheduleModal__footer'>
        <button 
            className='btn-normal auto px-2 py-1 rounded-3xl shadow-lg line-through'
            // onClick={handleClickCancel}
        >
            자세히 보기
        </button>
        <button 
            className='btn-normal auto px-2 py-1 rounded-3xl shadow-lg'
            onClick={handleClickCancel}
        >
            나가기
        </button>
    </footer>
  )
}

export default ScheduleDetailFooter