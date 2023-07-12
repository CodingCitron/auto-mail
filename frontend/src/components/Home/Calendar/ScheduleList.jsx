import React, { useContext, useEffect } from 'react'
import { CalendarStateContext } from '../../../context/Calendar'
import Schedule from './Schedule'

const ScheduleList = ({ index }) => {
    const state = useContext(CalendarStateContext)
    // console.log(props)

    useEffect(() => {
        console.log('ScheduleList 재렌더')
    })

  return (
    <ul className='schedules'>
        {   
            state.scheduleList[index] &&
            state.scheduleList[index].schedules.map(schedule => (
                <Schedule 
                    key={schedule.id}
                    name={schedule.name}
                />
            ))
        }
    </ul> 
  )
}

export default ScheduleList