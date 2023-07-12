import React, { useCallback, useContext } from 'react'
import { CalendarStateContext } from '../../../context/Calendar'
import Day from './Day'

const Days = () => {
    const state = useContext(CalendarStateContext)

    const selectedDateHandle = useCallback((e) => {
        console.log(e)
    }, [])
  return (
    <div className='date'>
        {   
            state.scheduleList &&
            state.scheduleList.map(({
                index, 
                value,
                day,
            }) => (
                <Day 
                    key={index}
                    index={index}
                    value={value}
                    day={day}
                    setDate={selectedDateHandle}
                />
            ))
        }
    </div>
  )
}

export default React.memo(Days)