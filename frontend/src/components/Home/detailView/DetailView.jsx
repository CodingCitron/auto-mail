import React, { useCallback, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import useModals from '../../../hooks/useModal'

import ScheduleUpdateModal from '../modals/ScheduleUpdateModal'
import axios from 'axios'

const DetailView = () => {
    const { openModal } = useModals()

    const { schedule, deleteSchedule } = useCalendarStore(state => {
        return {
            schedule: state.selectedSchedule,
            deleteSchedule: state.deleteSchedule 
        }
    })

    const content = useMemo(() => {
        return schedule ? schedule.content : null
    }, [schedule])

    const updateHandler = useCallback(async () => {
        if(!schedule.id) return
        
        try {
            const res = await axios.get(`/schedule/${schedule.id}`)
            const { id, Timers, User, title, content, date } = res.data

            openModal (
                ScheduleUpdateModal,
                {
                    id,
                    title,
                    content,
                    date,
                    user: User.email,
                    timers: Timers,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }, [schedule])

    const deleteHandler = useCallback(async () => {
        if(!schedule.id) return

        deleteSchedule(schedule)
    }, [schedule])

  return (
    <section className='flex-1 border p-1'>
        <h4 className='flex justify-between'>
            <div>
                스케줄 상세
            </div>
            <div className='flex gap-1'>
                <button onClick={updateHandler}>수정</button>
                <button onClick={deleteHandler}>삭제</button>
            </div>
        </h4>
        <div dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    </section>
  )
}

export default DetailView