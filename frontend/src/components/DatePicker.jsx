import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale'

// https://www.npmjs.com/package/react-datepicker
const DatePicker = ({ selected, setSelected }) => {
  // console.log(selected)

  return (
    <ReactDatePicker
      locale={ko}
      dateFormat="yyyy년 MM월 dd일"
      selected={selected} 
      onChange={(date) => setSelected(date)} 
    />
  )
}

export default DatePicker