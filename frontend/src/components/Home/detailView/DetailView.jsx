import React, { useMemo } from 'react'
import { useCalendarStore } from '../../../store/calendar'

const DetailView = () => {
    const schedule = useCalendarStore(state => state.selectedSchedule)

    const content = useMemo(() => {
        return schedule ? schedule.content : null
    }, [schedule])

  return (
    <section className='flex-1 border p-1'>
        <h4 className='flex justify-between'>
            <div>
                스케줄 상세
            </div>
            <div className='flex gap-1'>
                <button>수정</button>
                <button>삭제</button>
            </div>
        </h4>
        <div dangerouslySetInnerHTML={{ __html: content }}>
        </div>
    </section>
  )
}

export default DetailView