import React, { useCallback, useEffect, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'

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
                className='bg-red-300 mb-[2px] rounded-md flex justify-between h-[21px]'
                // onClick={e => select(e, {
                //     index,
                //     id: schedule.id
                // })}
                key={schedule.id}
            >
                <div className='text-elipsis'>
                    {schedule.title}
                </div>
                <div className='flex gap-1'>
                    <Link
                        to={`/detail/${schedule.id}`} 
                        className='center h-full'>
                        <span className="material-icons text-[14px]">
                            open_in_new
                        </span>
                    </Link>
                    <button className='center h-full'>
                        <span className="material-icons text-[14px]">
                            close
                        </span>
                    </button>
                </div>
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