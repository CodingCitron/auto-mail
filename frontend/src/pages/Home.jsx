import React, { useCallback, useContext, useEffect } from 'react'
import { ScheduleDispatchContext, ScheduleStateContext } from '../context/schedule'
import Calendar from '../components/Home/Calendar/Calendar'
import PlanList from '../components/PlanList'
import PlanDetail from '../components/PlanDetail'
import PlanCreate from '../components/PlanCreate'
import useModals from '../components/hooks/useModal'

import Schedule from '../utils/Schedule'
import { CalendarStateContext, CalendarDispatchContext } from '../context/Calendar'

const Home = () => {
    const { openModal } = useModals()
    const calendarState = useContext(CalendarStateContext) 
    const calendarDispatch = useContext(CalendarDispatchContext)

    const openPlanCreateView = () => {
        // Component, props
        openModal (
            PlanCreate,
            {}
        )
    }

    function addData() {                  
        calendarDispatch.create(
            new Schedule({
                id: 8,
                name: '테스트 일정 5',
                date: new Date(2023, 6, 4), 
            })
        )
    }

    // https://velog.io/@pon06188/Warning-Cannot-update-a-component-A-while-rendering-a-different-component-B.-To-locate-the-bad-setState-call-inside-B-follow-the-stack-trace-as-described-in-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0
    useEffect(() => {
        const date = new Date()

        calendarDispatch.init({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: 1
        })
    }, [])

  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            { ( 
                calendarState &&
                calendarState.year &&
                calendarState.month
            ) && (
                <Calendar
                    year={calendarState.year}
                    month={calendarState.month}
                    day={calendarState.day}
                />
            ) }
            <div className='calendar-tool mt-2 flex items-start w-full'>
                <button 
                    onClick={openPlanCreateView}
                    className='btn-normal p-1 auto rounded-sm'
                >
                    일정등록
                </button>
                <button onClick={addData}>
                    데이터 추가
                </button>
            </div>
        </div>
    </main>
  )
}

export default Home