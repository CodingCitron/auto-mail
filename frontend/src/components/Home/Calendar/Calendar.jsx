import React, { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { useCalendarStore } from '../../../store/calendar'

import CalendarHeader from './CalendarHeader'
import CalendarFooter from './CalendarFooter'
import Week from './Week'
import Days from './Days'

// https://im-designloper.tistory.com/87
const Calendar = () => {
    const { year, month, day, prev, next, create } = useCalendarStore(state => {
        return {
            year: state.year,
            month: state.month,
            day: state.day,
            prev: state.prev,
            next: state.next,
            create: state.createSchedule,
        }
    }, shallow)

  return (
    <>
        <CalendarHeader 
            prev={prev}
            next={next}
        />
        <div className='calendar'>
            <Week />
            <Days 
                year={year}
                month={month}
            />
        </div>
        <CalendarFooter 
            create={create}
        />
    </>
  )
}

export default React.memo(Calendar)
