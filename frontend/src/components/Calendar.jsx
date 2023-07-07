import React, { useCallback, useState } from 'react'
import Day from './Day'
import Week from './Week'

const Calendar = () => {
    const date = new Date()
    const week = '일,월,화,수,목,금,토'.split(',')

    const [selectedYear, setSelectedYear] = useState(date.getFullYear()) 
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1)
    const [selectedDate, setSelectedDate] = useState(date.getDate())
    const [selectedDay, setSelectedDay] = useState(date.getDay())

    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate() // 선택된 연도, 달의 마지막 날짜

    const prevMonth = useCallback(() => {
        console.log(date.getMonth() + 1)
    }, [])

    const nextMonth = useCallback(() => {
        console.log(date.getMonth() + 1)
    }, [])

    const renderDay = useCallback(() => {
        const days = []
        let empty = 0

        for (const today of week) {
            const day = new Date(selectedYear, selectedMonth - 1, 1)
            // console.log(date.toDateString())
            // console.log(day.toDateString())

            if(week[day.getDay()] === today) {
                for(let i = 0; i < dateTotalCount; i++) {
                    days.push(
                        <Day 
                            key={i + 1} 
                            value={i + 1}
                            today={date}
                            day={new Date(selectedYear, selectedMonth - 1, 1 + i)}
                        />
                    )
                }
            } else {
                days.push(
                    <Day 
                        key={empty} 
                        value={0}
                        today={date}
                        day={new Date(selectedYear, selectedMonth - 1, 0 + empty)}
                    />
                )
                empty--
            }
        }

        return days
    }, [])

    const renderWeek = useCallback(() => {
        return week.map(day => {
            return (
                <Week key={day} day={day} />
            )
        })
    }, [week])
  return (
    <div className='center'>
        <div className='calendar-wrap'>
            <div className='title'>
                <div>
                    날짜 선택 드랍다운 메뉴
                </div>
                <div className='pagination'>
                    <button onClick={prevMonth}>
                        <span className="material-icons">
                            navigate_before
                        </span>
                    </button>
                    <button onClick={nextMonth}>
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
                    { renderDay() }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calendar
// export default React.memo(Calendar)