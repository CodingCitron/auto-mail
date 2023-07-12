import React, { createContext, useMemo, useState, useContext, useCallback } from 'react'
import { initScheduleData } from '../utils/calendar'

export const CalendarStateContext = createContext(null)
export const CalendarDispatchContext = createContext(null)

export const CalendarProvider = ({ children }) => {
    const [calendar, setCalendar] = useState({
        year: null,
        month: null,
        day: null,
        focus: null,
        scheduleList: []
    })

     const init = useCallback((year, month, day = 1) => {
        const scheduleList = initScheduleData(
            year,
            month
        )

        return { year, month, day, scheduleList }
    }, [])

    const actions = useMemo(
        () => ({
            init(payload) {
                // setCalendar((prev) => ({
                //     year: payload.year,
                //     month: payload.month,
                //     day: payload.day,
                //     scheduleList: list
                // }))

                setCalendar({
                    ...prev,
                    ...init(
                        payload.year,
                        payload.month,
                        payload.day
                    )
                })
            },

            prev() {
                setCalendar((prev) => {
                    const data = {
                        ...prev,
                        scheduleList: []
                    }

                    if(prev.month === 1) {
                        data.month = 12
                        data.year = prev.year - 1
                    } else {
                        data.month = prev.month - 1
                    }

                    const list = init(
                        data.year, 
                        data.month,
                    )

                    return {
                        ...prev,
                        ...list
                    }
                })
            },

            next() {
                setCalendar((prev) =>   {
                    const data = {
                        ...prev,
                        scheduleList: []
                    }

                    if(prev.month === 12) {
                        data.month = 1
                        data.year = prev.year + 1
                    } else {
                        data.month = prev.month + 1
                    }

                    const list = init(
                        data.year, 
                        data.month,
                    )

                    return {
                        ...prev,
                        ...list
                    }
                })
            },

            setDate() {

            },

            create(data) {
                // 현재 보여주는 달력에 있다면


                // 없다면
            }
        })
    )

    // const init = useCallback(({ year, month, day }) => {
    //     dispatch({ type: "INIT", payload: {
    //         year, 
    //         month, 
    //         day
    //     } })
    // }, [])

    // const prev = useCallback(() => {
    //     let year = state.year
    //     let month = state.month

    //     if(month === 1) {
    //         month = 12
    //         year -= 1
    //     } else {
    //         month -= 1
    //     }

    //     dispatch({ type: "PREV_MONTH", 
    //         payload: {
    //             year: year,
    //             month: month
    //         } 
    //     })
    // }, [state])

    // const next = useCallback(() => {
    //     let year = state.year
    //     let month = state.month

    //     if(month === 12) {
    //         month = 1
    //         year += 1
    //     } else {
    //         month += 1
    //     }

    //     dispatch({ type: "PREV_MONTH", 
    //         payload: {
    //             year: year,
    //             month: month
    //         } 
    //     })
    // }, [state])

    // const memoizedDispatch = useMemo(() => {
    //     return { init, prev, next }
    // }, [])

  return (
    <CalendarStateContext.Provider value={calendar}>
        <CalendarDispatchContext.Provider value={actions}>
            { children }
        </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>
  )
}