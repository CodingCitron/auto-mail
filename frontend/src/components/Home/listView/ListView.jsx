import React, { useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'

const ListView = () => {
    const { day } = useCalendarStore(state => {
        return {
            day: state.selectedDay
        }
    })

    const schedules = useMemo(() => {
        console.log(day)
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

  return (
    <div>
        { schedules }
    </div>
  )
}

export default React.memo(ListView)