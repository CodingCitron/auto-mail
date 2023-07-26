import React from 'react'

const Sidebar = () => {
  return (
    <aside className='home-page-sidebar'>
        <button 
            className='sidebar-button'
            title='캘린더'
        > {/* 메인 페이지 */}
            <span className="material-icons">
                calendar_month
            </span>
        </button>
        <button 
            className='sidebar-button'
            title='일정 추가'
        > {/* 일정 추가 */}
            <span className="material-icons">
                border_color
            </span>
        </button>
    </aside>
  )
}

export default Sidebar