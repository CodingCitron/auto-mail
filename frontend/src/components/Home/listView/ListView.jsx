import React, { useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'

const ListView = () => {
    const { day } = useCalendarStore(state => {
        return {
            day: state.selectedDay
        }
    })

    const schedules = useMemo(() => {
        return (
            <ul>
                {   
                    day &&
                    day.schedules.map(schedule => (
                        <li key={schedule.id}>
                            {schedule.title}
                        </li>
                    ))
                }
            </ul>
        )
    }, [day])

    const date = useMemo(() => {
        if(!day) return 
        const { date } = day
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    }, [day])

  return (
    <section className='w-[400px] border p-1'>
        <h3 className='flex justify-between'>
            <div>
                스케줄 목록
            </div>
            <div>
                { date }
            </div>
        </h3>
        { schedules }
    </section>
  )
}

export default React.memo(ListView)