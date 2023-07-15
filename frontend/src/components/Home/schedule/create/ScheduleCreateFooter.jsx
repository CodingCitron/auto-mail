import React from 'react'

const ScheduleCreateFooter = ({ handleClickSubmit, handleClickCancel }) => {
  return (
    <footer className='mt-3 flex gap-2 justify-end'>
        <button 
            className='btn-normal auto p-1 rounded-sm'
            onClick={handleClickSubmit}
        >
            일정등록
        </button>
        <button 
            className='btn-normal auto p-1 rounded-sm'
            onClick={handleClickCancel}
        >
            취소
        </button>
    </footer>
  )
}

export default React.memo(ScheduleCreateFooter)