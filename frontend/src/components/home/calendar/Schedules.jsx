import React, { useCallback, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import { shallow } from 'zustand/shallow'
import { useModalStore } from '../../../store/modal'

import ScheduleDetailModal from '../modals/ScheduleDetailModal'

const Schedules = ({ index }) => {
    const { schedules, selectSchedul, deleteSchedule } = useCalendarStore(state => {
        return {
            selectSchedule: state.selectSchedule,
            schedules: state.list[index].schedules,
            deleteSchedule: state.deleteSchedule,
        }
    }, shallow)
    const { open } = useModalStore(state => state)
    
    const openScheduleDetailView = useCallback((id) => {
        open(ScheduleDetailModal, {
            id
        })
    }, [schedules])

    const select = useCallback((e, info) => {
        e.stopPropagation()
        selectSchedule(info)
    })

    const deleteScheduleHandle = useCallback((schedule) => {
        deleteSchedule({
            ...schedule,
            index
        })
    }, [schedules])

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
                    <button
                        className='center h-full'
                        onClick={() => openScheduleDetailView(schedule.id)}
                    >
                        <span className="material-icons text-[14px]">
                            open_in_new
                        </span>
                    </button>
                    <button 
                        className='center h-full'
                        onClick={() => deleteScheduleHandle(schedule)}
                    >
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