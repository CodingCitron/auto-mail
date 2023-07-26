import React from 'react'

const ScheduleCreateHeader = ( { handleClickCancel } ) => {
  return (
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
  )
}

export default React.memo(ScheduleCreateHeader)