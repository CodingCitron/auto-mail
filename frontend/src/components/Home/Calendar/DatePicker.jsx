import React, { useMemo } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { shallow } from 'zustand/shallow'

import { useCalendarStore } from '../../../store/calendar'

// https://www.npmjs.com/package/react-datepicker
// https://reactdatepicker.com/
// https://www.youtube.com/watch?v=fZPgBnL2x-Q
const DatePicker = () => {
  const { year, month, day, setDate } = useCalendarStore(state => {
    return {
      year: state.year,
      month: state.month,
      day: state.day,
      setDate: state.setDate
    }
  }, shallow) 

  const getDate = useMemo(() => {
    return new Date(year, month - 1, (day || 1))
  }, [year, month, day])

  return (
    <ReactDatePicker
      locale={ko}
      dateFormat="yyyy년 MM월"
      showMonthYearPicker
      selected={getDate} 
      onChange={setDate} 
    />
  )
}

export default React.memo(DatePicker)