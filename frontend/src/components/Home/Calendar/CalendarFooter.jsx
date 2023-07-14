import React, { useEffect } from 'react'
import useModals from '../../../hooks/useModal'
import ScheduleCreateModal from '../modals/ScheduleCreateModal'

const CalendarFooter = ({ setSchedule }) => {
    const { openModal } = useModals()

    const openPlanCreateView = () => {
        // Component, props
        openModal (
            ScheduleCreateModal,
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
        <button onClick={setSchedule}>
            데이터 추가
        </button>
    </div>
  )
}

export default React.memo(CalendarFooter)