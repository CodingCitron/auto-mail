import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

const DatePicker = () => {
  return (
    <div className='date-picker-wrap'>
        <ReactDatePicker 
            locale={ko}
        />
    </div>
  )
}

export default DatePicker