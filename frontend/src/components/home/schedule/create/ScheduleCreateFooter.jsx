import React from 'react'

const ScheduleCreateFooter = ({ handleClickSubmit, handleClickCancel }) => {
  return (
    <footer className='scheduleModal__footer'>
        <button 
            className='btn-normal auto px-2 py-1 rounded-3xl shadow-lg'
            onClick={handleClickSubmit}
        >
            일정등록
        </button>
        <button 
            className='btn-normal auto px-2 py-1 rounded-3xl shadow-lg'
            onClick={handleClickCancel}
        >
            취소
        </button>
    </footer>
  )
}

export default React.memo(ScheduleCreateFooter)