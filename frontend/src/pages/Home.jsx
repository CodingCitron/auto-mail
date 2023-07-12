import React, { useContext, useEffect } from 'react'
import { ScheduleDispatchContext, ScheduleStateContext } from '../context/schedule'
import Calendar from '../components/Calendar'
import PlanList from '../components/PlanList'
import PlanDetail from '../components/PlanDetail'
import PlanCreate from '../components/PlanCreate'
import useModals from '../components/hooks/useModal'

import Schedule from '../utils/Schedule'
import { initScheduleData } from '../utils/calendar'
import { CalendarDispatchContext, CalendarStateContext } from '../context/Calendar'

const Home = () => {
    const { openModal } = useModals()
    const scheduleList = useContext(ScheduleStateContext)
    const scheduleDispatch = useContext(ScheduleDispatchContext)
    const calenderState = useContext(CalendarStateContext) 
    const calenderDispatch = useContext(CalendarDispatchContext) 

    const openPlanCreateView = () => {
        // Component, props
        openModal (
            PlanCreate,
            {}
        )
    }

    function addData() {
        scheduleDispatch.create(
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

        calenderDispatch.init({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDay(),
        })

        scheduleDispatch.init(initScheduleData(2023, 7))
    }, [])

  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            <Calendar 
                scheduleList={scheduleList} 
                year={calenderState.year}
                month={calenderState.month}
            />
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