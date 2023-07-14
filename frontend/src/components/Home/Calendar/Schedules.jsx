import React, { useEffect, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'

const Schedules = ({ index }) => {
    const { schedules } = useCalendarStore(state => {
        return {
            schedules: state.list[index].schedules
        }
    }, shallow)

    const memorizedList = useMemo(() => {
        return schedules.map(schedule => (
            <li 
                key={schedule.id}
            >
                {schedule.title}
            </li>
        ))
    }, [schedules, index])

    // useEffect(() => {
    //     console.log('schedlues rerender')
    // })

  return (
    <ul className='schedules'>
        { memorizedList }
    </ul> 
  )
}

export default React.memo(Schedules)