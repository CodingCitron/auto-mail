import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/esm/locale'

// https://www.npmjs.com/package/react-datepicker
// https://reactdatepicker.com/
const DatePicker = ({ dateFormat, selected, setSelected }) => {

  // const renderMonthContent = (month, shortMonth, longMonth) => {
  //   console.log(month, shortMonth, longMonth)
  //   const tooltipText = `Tooltip for month: ${longMonth}`
  //   return <span title={tooltipText}>{shortMonth}</span>
  // }

  useEffect(() => {
    console.log(selected)
    console.log('데이트 피커 호출')
  }, [])

  return (
    <ReactDatePicker
      locale={ko}
      dateFormat={dateFormat}
      // renderMonthContent={renderMonthContent}
      showMonthYearPicker
      selected={selected} 
      onChange={(date) => setSelected(date)} 
    />
  )
}

export default React.memo(DatePicker)