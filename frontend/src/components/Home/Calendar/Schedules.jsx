import React, { useEffect, useMemo } from 'react'
import Schedule from './Schedule'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'

const ScheduleList = ({ index }) => {
    const { schedules } = useCalendarStore(state => {
        return {
            schedules: state.list[index].schedules
        }
    }, shallow)

    const memorizedList = useMemo(() => {
        // console.log(schedules)
        return schedules.map(schedule => (
            <Schedule 
                key={schedule.id}
                name={schedule.name}
            />
        ))
    }, [schedules, index])

  return (
    <ul className='schedules'>
        { memorizedList }
    </ul> 
  )
}

export default React.memo(ScheduleList)