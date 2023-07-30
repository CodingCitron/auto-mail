import React from 'react'

const ScheduleDetailHeader = ({ title, handleClickCancel }) => {
  return (
    <header className='scheduleModal__header'>
        <div>
            <h3 className='scheduleModal__header-title'>{ title }</h3>
        </div>
        <div className='h-full'>
            <button 
                className='flex items-center modal__icon-color'
                onClick={handleClickCancel}
            >
                {/* 취소 */}
                <span className="material-icons">
                    close
                </span>
            </button>
        </div>
    </header>
  )
}

export default ScheduleDetailHeader