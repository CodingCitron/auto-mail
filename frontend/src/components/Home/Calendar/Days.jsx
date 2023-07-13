import React, { useMemo } from 'react'
import Day from './Day'
import { dateFor, getStartDate } from '../../../services/calendar'

const Days = ({ year, month }) => {
    const dates = useMemo(() => {
        return dateFor(
            getStartDate(year, month), 
            42, 
            ({ curDate }, index) =>{ 
                return (
                    <Day
                        key={index}
                        index={index}
                        date={curDate}
                    />
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