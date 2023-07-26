import React, { useMemo } from 'react'
import { week } from '../../../services/calendar'

const option = {
  '토': 'saturday',
  '일': 'sunday'
}

const Week = () => {
  const drawWeek = useMemo(() => {
    return week.map(day => (
      <div 
        key={day}
        className={option[day] || ''}
      >
        {day}요일
      </div>
    ))
  }, [])

  return (
    <div className='week'>
      { drawWeek }
    </div>
  )
}

export default React.memo(Week)