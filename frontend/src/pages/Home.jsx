import React, { useContext, useEffect } from 'react'
import { ScheduleDispatchContext } from '../context/schedule'
import Calendar from '../components/Calendar'
import PlanList from '../components/PlanList'
import PlanDetail from '../components/PlanDetail'
import PlanCreate from '../components/PlanCreate'
import useModals from '../components/hooks/useModal'

import Schedule from '../utils/Schedule'

const Home = () => {
    const { openModal } = useModals()
    const scheduleDispatch = useContext(ScheduleDispatchContext)

    const openPlanCreateView = () => {
        // Component, props
        openModal (
            PlanCreate,
            {}
        )
    }

    const testData = [
        new Schedule({
            id: 0,
            name: '테스트 일정',
            date: new Date(), 
        }),
        new Schedule({
            id: 1,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 15), 
        }),
        new Schedule({
            id: 2,
            name: '테스트 일정 2',
            date: new Date(2023, 7, 15), 
        }),
        new Schedule({
            id: 3,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 10), 
        }),
        new Schedule({
            id: 4,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 10), 
        }),
        new Schedule({
            id: 5,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 10), 
        }),
        new Schedule({
            id: 6,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 10), 
        }),
        new Schedule({
            id: 7,
            name: '테스트 일정 2',
            date: new Date(2023, 6, 5), 
        }),
    ]

    function addData() {
        scheduleDispatch.create(
            new Schedule({
                id: 8,
                name: '테스트 일정 5',
                date: new Date(2023, 6, 4), 
            })
        )
    }

    console.log(scheduleDispatch)

    // https://velog.io/@pon06188/Warning-Cannot-update-a-component-A-while-rendering-a-different-component-B.-To-locate-the-bad-setState-call-inside-B-follow-the-stack-trace-as-described-in-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0
    useEffect(() => {
        scheduleDispatch.init(testData)
    }, [])

  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            <Calendar />
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