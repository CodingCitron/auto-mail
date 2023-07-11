import React, { useContext, useEffect } from 'react'
import { ScheduleStateContext } from '../context/schedule'

// value, day, today, setDate, schedules
const Day = ({ value, day, today, setDate }) => {
    const scheduleList = useContext(ScheduleStateContext)
    
    const isToday = day.toDateString() === today.toDateString()
    const className = isToday ? 'day-background today' : 'day-background'

    const schedules = scheduleList.filter(schedule => schedule.compareDate(day))

    // console.log(`${key} 데이 호출?`)
    return (
        <div className='flex flex-col' onClick={() => setDate(day)}>
            <div className={className}>
                { value === 0 ? '' : value }
            </div>
            {/* 이날 계획 목록 */}
            <ul className='schedules'>
                {
                    schedules.map(schedule => (
                        <li key={schedule.id}>
                            {schedule.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Day)