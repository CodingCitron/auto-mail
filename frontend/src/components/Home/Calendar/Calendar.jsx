import React, { useEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useCalendarStore } from '../../../store/calendar'

import CalendarHeader from './CalendarHeader'
import CalendarFooter from './CalendarFooter'
import Week from './Week'
import Days from './Days'

// https://im-designloper.tistory.com/87
const Calendar = () => {
    const { year, month, day, prev, next, initData, getDate, setDate, setSchedule } = useCalendarStore(state => {
        return {
            year: state.year,
            month: state.month,
            day: state.day,
            prev: state.prev,
            next: state.next,
            getDate: state.getDate,
            setDate: state.setDate,
            setSchedule: state.setSchedule,
            initData: state.initData,
        }
    }, shallow)
    
    const memorized = useMemo(() => {
        return { prev, next, setSchedule, getDate, setDate }
    }, [])

    useEffect(() => {
        // console.log('Calendar init')
        initData()
    }, [])

  return (
    <>
        <CalendarHeader 
            year={year}
            month={month}
            day={day}
            getDate={memorized.getDate}
            setDate={memorized.setDate}
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
