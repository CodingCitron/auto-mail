import React from 'react'

const Day = ({ value, day, today }) => {
    const isToday = day.toDateString() === today.toDateString()
    const className = isToday ? 'day-background today' : 'day-background'

    return (
        <div className='relative'>
            <div className={className}>
                { value === 0 ? '' : value }
            </div>
            <ul>
                {/* 이날 계획 목록 */}

            </ul>
        </div>
    )
}

export default Day