import React from 'react'
import useModals from '../../../hooks/useModal'
import ScheduleCreate from '../Schedule/ScheduleCreate'

const CalendarFooter = ({ create }) => {
    const { openModal } = useModals()

    const openPlanCreateView = () => {
        // Component, props
        openModal (
            ScheduleCreate,
            {}
        )
    }

  return (
    <div className='calendar-tool mt-2 flex items-start w-full'>
        <button 
            onClick={openPlanCreateView}
            className='btn-normal p-1 auto rounded-sm'
        >
            일정등록
        </button>
        <button onClick={create}>
            데이터 추가
        </button>
    </div>
  )
}

export default React.memo(CalendarFooter)