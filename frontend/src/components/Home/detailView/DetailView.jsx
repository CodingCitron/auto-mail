import React, { useCallback, useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'
import axios from 'axios'

const DetailView = () => {
    const schedule = useCalendarStore(state => state.selectedSchedule)

    const content = useMemo(() => {
        return schedule ? schedule.content : null
    }, [schedule])

    const updateHandler = useCallback(() => {
        console.log(schedule)
    }, [schedule])

    const removeHandler = useCallback(async () => {
        console.log(schedule)
        try {
            
        } catch (error) {
            console.log(error)
        }
    }, [schedule])


  return (
    <section className='flex-1 border p-1'>
        <h4 className='flex justify-between'>
            <div>
                스케줄 상세
            </div>
            <div className='flex gap-1'>
                <button onClick={updateHandler}>수정</button>
                <button onClick={removeHandler}>삭제</button>
            </div>
        </h4>
        <div dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    </section>
  )
}

export default DetailView