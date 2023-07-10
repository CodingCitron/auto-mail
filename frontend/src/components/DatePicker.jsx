import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale'

// https://www.npmjs.com/package/react-datepicker
// https://reactdatepicker.com/
const DatePicker = ({ selected, setSelected }) => {
  // console.log(selected)

  // const renderMonthContent = (month, shortMonth, longMonth) => {
  //   console.log(month, shortMonth, longMonth)
  //   const tooltipText = `Tooltip for month: ${longMonth}`
  //   return <span title={tooltipText}>{shortMonth}</span>
  // }

  return (
    <ReactDatePicker
      locale={ko}
      dateFormat="yyyy년 MM월"
      // renderMonthContent={renderMonthContent}
      showMonthYearPicker
      selected={selected} 
      onChange={(date) => setSelected(date)} 
    />
  )
}

export default DatePicker