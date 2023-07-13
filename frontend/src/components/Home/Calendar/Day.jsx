import React, { useMemo } from 'react'
import Schedules from './Schedules'

const Day = ({ index, date }) => {
    // const state = useContext(CalendarStateContext)
    const day = useMemo(() => date.getDate(), [date])
    const className = useMemo(() => {
        if(date.toDateString() === new Date().toDateString()) {
            return 'day-background today' 
        } else {
            return 'day-background'
        }
    }, [date])

    return (
        <div 
            className='flex flex-col' 
            // onClick={() => setDate(date)}
        >
            <div className={className}>
                { day }
            </div>
            <Schedules
                index={index}
            />
        </div>
    )
}

export default React.memo(Day)