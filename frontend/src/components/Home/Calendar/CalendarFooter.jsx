import React, { useCallback, useEffect } from 'react'
import useModals from '../../../hooks/useModal'
import ScheduleCreateModal from '../modals/ScheduleCreateModal'

const CalendarFooter = () => {
    const { openModal } = useModals()

    const openPlanCreateView = useCallback(() => {
        // Component, props
        openModal (
            ScheduleCreateModal,
            {}
        )
    }, [])

    // useEffect(() => {
    //     console.log('CalendarFooter rerender')
    // })

  return (
    <div className='calendar-tool mt-2 flex items-start w-full'>
        <button 
            onClick={openPlanCreateView}
            className='btn-normal p-1 auto rounded-sm'
        >
            일정등록
        </button>
    </div>
  )
}

export default React.memo(CalendarFooter)