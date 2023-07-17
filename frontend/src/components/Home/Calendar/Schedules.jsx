import React, { useEffect, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'

const Schedules = ({ index }) => {
    const { schedules, setSelected } = useCalendarStore(state => {
        return {
            setSelected: state.setSelected,
            schedules: state.list[index].schedules
        }
    }, shallow)

    const memorizedList = useMemo(() => {
        return schedules.map(schedule => (
            <li 
                onClick={e => setSelected(schedule.id)}
                key={schedule.id}
            >
                {schedule.title}
            </li>
        ))
    }, [schedules])

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