import { createContext, useCallback, useMemo, useReducer } from "react"
import { initScheduleData } from '../utils/calendar'

export const ScheduleStateContext = createContext(null)
export const ScheduleDispatchContext = createContext(null)

const reducer = (state, { type, payload }) => {
  switch(type) {
    // 현재 선택된 달력으로 다시 서버에 요청
    case "INIT":
      return payload
    case "CREATE":
      return [
        ...state,
        payload
      ]
    default:
      return state
  }
}

export const ScheduleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])

  /**
   * 시작 날짜, 끝 날짜
   * useCallback을 사용하는 이유
   * state 변경에 따라서 작성된 코드들이 다 재호출 되는 거 같다. 이 문제를 해결하기 위해 useCallback을 사용하여 함수의 재호출을 막는다.
   */
  const init = useCallback((data) => {
    dispatch({ type: "INIT", payload: data })
  }, [])

  const create = useCallback((data) => {
    dispatch({ type: "CREATE", payload: data })
  }, [])

  const memoizedDispatch = useMemo(() => {
      return { init, create }
  }, [])

  return (
    <ScheduleStateContext.Provider value={state}>
      <ScheduleDispatchContext.Provider value={memoizedDispatch}>
        { children }
      </ScheduleDispatchContext.Provider>
    </ScheduleStateContext.Provider>
  )
}
