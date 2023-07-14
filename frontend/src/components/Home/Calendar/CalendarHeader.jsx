import React, { useEffect, useMemo } from 'react'
import DatePicker from './DatePicker'

const CalendarHeader = ({ prev, next }) => {
    useEffect(() => {
        console.log('헤더 재렌더')
    })

  return (
    <header className='title'>
        <DatePicker
            dateFormat="yyyy년 MM월"
        />
        <div className='pagination'>
            <button 
                onClick={prev}
                className='btn'
            >
                <span className="material-icons">
                    navigate_before
                </span>
            </button>
            <button
                onClick={next} 
                className='btn'
            >
                <span className="material-icons">
                    navigate_next
                </span>
            </button>
        </div>
    </header>
  )
}

export default React.memo(CalendarHeader)