import React, { useEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useCalendarStore } from '../../../store/calendar'

import CalendarHeader from './CalendarHeader'
import CalendarFooter from './CalendarFooter'
import Week from './Week'
import Days from './Days'

// https://im-designloper.tistory.com/87
const Calendar = () => {
    const { year, month, day, prev, next, initData, getDate, setDate, setSchedule, selectDay } = useCalendarStore(state => {
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
            selectDay: state.selectDay
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
        <div className='calendar-wrap'>
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
                    selectDay={selectDay}
                />
            </div>
            <CalendarFooter 
                setSchedule={memorized.setSchedule}
            />
        </div>
    </>
  )
}

export default React.memo(Calendar)
