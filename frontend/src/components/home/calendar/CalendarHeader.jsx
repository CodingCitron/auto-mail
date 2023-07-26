import React, { useEffect, useMemo } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

const CalendarHeader = ({ year, month, day, prev, next, setDate }) => {
    const getDate = useMemo(() => new Date(year, month - 1, (day || 1)), [year, month, day])

    // useEffect(() => {
    //     console.log('CalenderHeader renderer')
    // })

  return (
    <header className='title'>
        <ReactDatePicker
            locale={ko}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            selected={getDate} 
            onChange={setDate} 
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