import React, { useCallback, useRef, useState } from 'react'
import Day from './Day'
import Week from './Week'
import Dropdown from './Dropdown'
import PlanList from './PlanList'
import PlanDetail from './PlanDetail'

const Calendar = () => {
    const date = new Date()
    const week = '일,월,화,수,목,금,토'.split(',')

    const [selectedYear, setSelectedYear] = useState(date.getFullYear()) 
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1)

    const prevMonth = useCallback(() => {
        if(selectedMonth === 1) {
            setSelectedMonth(12)
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }, [selectedMonth])

    const nextMonth = useCallback(() => {
        if(selectedMonth === 12) {
            setSelectedMonth(1)
            setSelectedYear(selectedYear + 1)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }, [selectedMonth])

    // 총 42개 렌더링 하는데 로직 변경 필요
    const renderDay = useCallback(() => {
        const days = []
        let nextId = 0

        const day = new Date(selectedYear, selectedMonth - 1, 1)
        
        const prevDateCount = week.findIndex(w => w === week[day.getDay()])
        const thisDateCount = new Date(selectedYear, selectedMonth, 0).getDate() // 선택된 연도, 달의 마지막 날짜
        const nextDateCount = 42 - (prevDateCount + thisDateCount)

        for(let i = prevDateCount - 1; i >= 0; i--) {
            const prevDate = new Date(selectedYear, selectedMonth - 1, 0 - i)

            days.push(
                <Day 
                    key={nextId} 
                    value={prevDate.getDate()}
                    today={date}
                    day={prevDate}
                />
            )
            nextId += 1
        }

        for(let i = 0; i < thisDateCount; i++) {
            const thisDate = new Date(selectedYear, selectedMonth - 1, 1 + i)

            days.push(
                <Day 
                    key={nextId} 
                    value={thisDate.getDate()}
                    today={date}
                    day={thisDate}
                />
            ) 
            nextId += 1
        }

        for(let i = 0; i < nextDateCount; i++) {
            const nextDate = new Date(selectedYear, selectedMonth, i + 1)

            days.push(
                <Day 
                    key={nextId} 
                    value={nextDate.getDate()}
                    today={date}
                    day={nextDate}
                />
            ) 

            nextId += 1
        }
        
        return days
    }, [selectedYear, selectedMonth])

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
                    <Dropdown />
                </div>
                <div className='pagination'>
                    <button onClick={prevMonth} className='btn'>
                        <span className="material-icons">
                            navigate_before
                        </span>
                    </button>
                    <button onClick={nextMonth} className='btn'>
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
            <div>
                <PlanList />
                <PlanDetail />
            </div>
        </div>
    </div>
  )
}

export default Calendar
// export default React.memo(Calendar)