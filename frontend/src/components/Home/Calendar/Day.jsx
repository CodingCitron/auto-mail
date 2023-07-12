import React, { useContext } from 'react'
import Schedule from './Schedule'
import { CalendarStateContext } from '../../../context/Calendar'
import { CompareDay } from '../../../utils/calendar'
import ScheduleList from './ScheduleList'

// value, day, today, setDate, schedules
function areEqual(prevProps, nextProps) {
    // 날짜 비교
    if(CompareDay(prevProps.day, nextProps.day)) {
       return true  
    }

    return false
}

const Day = ({ index, value, day, setDate }) => {
    // const state = useContext(CalendarStateContext)
    
    const isToday = day.toDateString() === new Date().toDateString()
    const className = isToday ? 'day-background today' : 'day-background'

    console.log(`데이 호출`)
    // console.log(index)
    // console.log(state.scheduleList[index].schedules)
    return (
        <div className='flex flex-col' onClick={() => setDate(day)}>
            <div className={className}>
                { value === 0 ? '' : value }
            </div>
            {/* 이날 계획 목록 */}
            <ScheduleList
                index={index}
            />
            {/* <ul className='schedules'>
                {   state.scheduleList[index] &&
                    state.scheduleList[index].schedules.map(schedule => (
                        <Schedule 
                            key={schedule.id}
                            name={schedule.name}
                        />
                    ))
                }
            </ul> */}
        </div>
    )
}

export default React.memo(Day, areEqual)