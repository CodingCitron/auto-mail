import React, { useCallback, useEffect, useMemo } from 'react'
import { dateFor, getStartDate } from '../../../services/calendar'
import Schedules from './Schedules'

const Days = ({ year, month, selectDay }) => {
    const day = useCallback((date) => date.getDate(), [])
    const className = useCallback((date) => {
        if(date.toDateString() === new Date().toDateString()) {
            return 'day-background today' 
        } else {
            return 'day-background'
        }
    }, [])

    const dates = useMemo(() => {
        return dateFor(
            getStartDate(year, month), 
            42, 
            ({ curDate }, index) =>{ 
                return (
                    <div 
                        key={index}
                        className='flex flex-col'
                        onClick={() => selectDay(index)}
                        // onClick={() => setDate(date)}
                    >
                        <div className={className(curDate)}>
                            { day(curDate) }
                        </div>
                        <Schedules
                            index={index}
                        />
                    </div>
                )
            }
        )
    }, [year, month])

  return (
    <div className='date'>
        { dates }
    </div>
  )
}

export default React.memo(Days)