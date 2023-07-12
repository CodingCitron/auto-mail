import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Day from './Day'
import Week from './Week'
import DatePicker from './DatePicker'
import { week } from '../../../utils/calendar'
import { CalendarDispatchContext } from '../../../context/Calendar'
import Days from './Days'

const date = new Date() // 오늘

function areEqual(prevProps, nextProps) {
    console.log(prevProps, nextProps)

    return true
}

// https://im-designloper.tistory.com/87
const Calendar = ({ year, month, day }) => {
    const calendarDispatch = useContext(CalendarDispatchContext) 
    
    useEffect(() => {
        console.log('캘린더 호출')
    })

    // const testAction = useCallback(() => {
    //     calendarDispatch.init({
    //         year: date.getFullYear(),
    //         month: date.getMonth() + 1,
    //         day: 1
    //     })
    // }, [])

    const renderWeek = useCallback(() => {
        return week.map(day => (
            <Week key={day} day={day} />
        ))
    }, [])

    const getSelectedDate = useCallback(() => {
        console.log(year, month)
        return month? new Date(year, month - 1, day) : null
    }, [])

  return (
    <>
        <div className='title'>
            <div>
                {/* 두번 호출 되는 문제 있음 */}
                { getSelectedDate && (
                    <DatePicker
                        dateFormat="yyyy년 MM월"
                        selected={getSelectedDate()} 
                        setSelected={calendarDispatch.setDate} 
                    />
                )}
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
            <Days />
            {/* <button onClick={() => {
                calendarDispatch.init({
                    year: 2023,
                    month: 7,
                })
            }}>테스트 버튼</button> */}
        </div>
    </>
  )
}

export default React.memo(Calendar, areEqual)
// export default React.memo(Calendar)