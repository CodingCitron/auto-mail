import React from 'react'

const Week = ({ day }) => {
    let className = ''

    if(day === '일') {
        className = 'sunday'
    } 

    if(day === '토') {
        className = 'saturday'
    }

  return (
    <div className={className}>
        {day}요일
    </div>
  )
}

export default Week