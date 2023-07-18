import React, { useCallback, useEffect, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'

const Schedules = ({ index }) => {
    const { schedules, selectSchedule } = useCalendarStore(state => {
        return {
            selectSchedule: state.selectSchedule,
            schedules: state.list[index].schedules
        }
    }, shallow)

    const select = useCallback((e, info) => {
        e.stopPropagation()
        selectSchedule(info)
    })

    const memorizedList = useMemo(() => {
        return schedules.map(schedule => (
            <li 
                className='bg-red-300 mb-[2px] rounded-md'
                onClick={e => select(e, {
                    index,
                    id: schedule.id
                })}
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