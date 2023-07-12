import React, { useCallback, useContext, useRef, useState } from 'react'
import Day from './Day'
import Week from './Week'
import DatePicker from './DatePicker'
import { dateFor, getStartDate, week } from '../utils/calendar'
import { ScheduleStateContext } from '../context/schedule'
import { CalendarDispatchContext } from '../context/Calendar'

const date = new Date() // 오늘

// https://im-designloper.tistory.com/87
const Calendar = ({ scheduleList, year, month }) => {
    // const scheduleList = useContext(ScheduleStateContext)
    const calendarDispatch = useContext(CalendarDispatchContext)
    console.log(year, month)
    // const [selectedYear, setSelectedYear] = useState(date.getFullYear()) 
    // const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1)
    // const [selectedDay, setSelectedDay] = useState(date.getDay())

    const prevMonth = useCallback(() => {
        // if(selectedMonth === 1) {
        //     setSelectedMonth(12)
        //     setSelectedYear(selectedYear - 1)
        // } else {
        //     setSelectedMonth(selectedMonth - 1)
        // }
    }, [])

    const nextMonth = useCallback(() => {
        // if(selectedMonth === 12) {
        //     setSelectedMonth(1)
        //     setSelectedYear(selectedYear + 1)
        // } else {
        //     setSelectedMonth(selectedMonth + 1)
        // }
    }, [])

    const selectedDateHandle = useCallback((e) => {
        // console.log(e)
    }, [])

    // 총 42개 렌더링 하는데 로직 변경 필요
    // const renderDay = useCallback(() => {
    //     // Reload

    //     // 렌더 준비 과정
    //     const startDate = getStartDate(selectedYear, selectedMonth)
    //     const days = dateFor(startDate, 42, (e, index) => {
    //         const { startDate, curDate, lastDate } = e 
    //         // const schedules = scheduleList.filter(schedule => schedule.compareDate(curDate))
    //         // selectedDateHandle()

    //         return (
    //             <Day 
    //                 key={index}
    //                 value={curDate.getDate()}
    //                 today={date}
    //                 day={curDate}
    //                 setDate={selectedDateHandle}
    //                 // schedules={schedules}
    //             />
    //         )
    //     })

    //     console.log('캘린더 호출?')
    //     return days
    // }, [selectedYear, selectedMonth])

    // const renderDay = useCallback(() => {
    //     return scheduleList.map(({
    //         index, 
    //         value,
    //         today,
    //         day,
    //         schedules
    //     }) => (
    //         <Day 
    //             key={index}
    //             value={value}
    //             today={today}
    //             day={day}
    //             schedules={schedules}
    //             setDate={selectedDateHandle}
    //         />
    //     ))
    // }, [scheduleList, year, month])

    const renderWeek = useCallback(() => {
        return week.map(day => (
            <Week key={day} day={day} />
        ))
    }, [])

    // const getSelectedDate = useCallback(() => {
    //     return new Date(selectedYear, selectedMonth - 1, selectedDay)
    // }, [selectedYear, selectedMonth, selectedDay])

    // const setSelectedDate = useCallback((date) => {
    //     setSelectedYear(date.getFullYear())
    //     setSelectedMonth(date.getMonth() + 1)
    //     setSelectedDay(date.getDay())
    // }, [selectedYear, selectedMonth, selectedDay])

  return (
    <>
        <div className='title'>
            <div>
                {/* <DatePicker 
                    selected={getSelectedDate()} 
                    setSelected={setSelectedDate} 
                /> */}
            </div>
            <div className='pagination'>
                <button 
                    onClick={calendarDispatch.prev} 
                    className='btn'
                >
                    <span className="material-icons">
                        navigate_before
                    </span>
                </button>
                <button
                    onClick={calendarDispatch.next} 
                    className='btn'
                >
                    <span className="material-icons">
                        navigate_next
                    </span>
                </button>
            </div>
        </div>
        <div className='calendar'>
            <div className='week'>
                { renderWeek() }
            </div>
            <div className='date'>
                {
                    scheduleList &&
                    scheduleList.map(({
                        index, 
                        value,
                        today,
                        day,
                        schedules
                    }) => (
                        <Day 
                            key={index}
                            value={value}
                            today={today}
                            day={day}
                            schedules={schedules}
                            setDate={selectedDateHandle}
                        />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default React.memo(Calendar)
// export default React.memo(Calendar)