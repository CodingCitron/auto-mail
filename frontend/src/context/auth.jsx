import { createContext, useContext, useEffect, useReducer } from "react"

const StateContext = createContext({
    authenticated: false,
    user: null,
    loading: false
})

const DispatchContext = createContext(null)

const reducer = (state, { type, payload }) => {
    // console.log(state, type, payload)
    switch(type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                user: payload
            }
        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
                user: null
            }
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            }
        default:
            // throw new Error(`Unknown action type: ${type}`)
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true
    })

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)