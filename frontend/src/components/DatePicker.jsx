import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

// https://www.npmjs.com/package/react-datepicker
const DatePicker = ({ selected, setSelected }) => {
  // console.log(selected)
  
  return (
    <ReactDatePicker
      dateFormat="yyyy-MM-dd"
      selected={selected} 
      onChange={(date) => setSelected(date)} 
    />

  )
}

export default DatePicker