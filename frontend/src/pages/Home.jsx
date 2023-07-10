import React from 'react'
import Calendar from '../components/Calendar'
import PlanList from '../components/PlanList'
import PlanDetail from '../components/PlanDetail'
import PlanCreate from '../components/PlanCreate'
import useModals from '../components/hooks/useModal'

const Home = () => {
    const { openModal } = useModals()

    const openPlanCreateView = () => {
        console.log('동작 ?')
        openModal (
            PlanCreate,
            {
                
            }
        )
    }

  return (
    <main className='center flex-col'>
        <div className='calendar-wrap'>
            <Calendar />
            <div className='calendar-tool mt-2 flex items-start w-full'>
                <button 
                    onClick={openPlanCreateView}
                    className='btn-normal p-1 auto rounded-sm'
                >
                    일정 추가
                </button>
            </div>
        </div>
    </main>
  )
}

export default Home