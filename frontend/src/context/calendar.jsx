import React, { createContext, useEffect, useMemo, useState } from 'react'

export const CalendarStateContext = createContext(null)
export const CalendarDispatchContext = createContext(null)

export const CalendarProvider = ({ children }) => {
    const [calendar, setCalendar] = useState({
        year: null,
        month: null,
        day: null
    })
    
    const actions = useMemo(
        () => ({
            init(payload) {
                setCalendar((prev) => ({
                    year: payload.year,
                    month: payload.month,
                    day: payload.day
                }))
            },

            prev() {
                setCalendar((prev) => {
                    const data = {}

                    if(prev.month === 1) {
                        data.month = 12
                        data.year = prev.yaer - 1
                    } else {
                        data.month = prev.month - 1
                    }

                    return {
                        ...prev,
                        ...data
                    }
                })
            },

            next() {
                setCalendar((prev) =>  {
                    console.log(prev)

                    return prev
                })
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