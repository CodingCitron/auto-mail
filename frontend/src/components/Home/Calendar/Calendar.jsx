import React, { useEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useCalendarStore } from '../../../store/calendar'

import CalendarHeader from './CalendarHeader'
import CalendarFooter from './CalendarFooter'
import Week from './Week'
import Days from './Days'

// https://im-designloper.tistory.com/87
const Calendar = () => {
    const { year, month, day, prev, next, setSchedule, initData } = useCalendarStore(state => {
        return {
            year: state.year,
            month: state.month,
            day: state.day,
            prev: state.prev,
            next: state.next,
            setSchedule: state.setSchedule,
            initData: state.initData,
        }
    }, shallow)
    
    const memorized = useMemo(() => {
        return { prev, next, setSchedule }
    }, [])

    useEffect(() => {
        initData()
    }, [])

  return (
    <>
        <CalendarHeader 
            prev={memorized.prev}
            next={memorized.next}
        />
        <div className='calendar'>
            <Week />
            <Days 
                year={year}
                month={month}
            />
        </div>
        <CalendarFooter 
            setSchedule={memorized.setSchedule}
        />
    </>
  )
}

export default React.memo(Calendar)
