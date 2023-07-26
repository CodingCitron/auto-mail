import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useModals from '../../../hooks/useModal'
import ScheduleCreateModal from '../modals/ScheduleCreateModal'

const Sidebar = () => {
    const { openModal } = useModals()

    const openScheduleCreateView = useCallback(() => {
        // Component, props
        openModal (
            ScheduleCreateModal,
            {}
        )
    }, [])

  return (
    <aside className='home-page-sidebar'>
        <Link 
            className='sidebar-button'
            to='/'
            title='캘린더'
        > {/* 메인 페이지 */}
            <span className="material-icons">
                calendar_month
            </span>
        </Link>
        <button 
            className='sidebar-button'
            title='일정 추가'
            onClick={openScheduleCreateView}
        > {/* 일정 추가 */}
            <span className="material-icons">
                border_color
            </span>
        </button>
    </aside>
  )
}

export default Sidebar