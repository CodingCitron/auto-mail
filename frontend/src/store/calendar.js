import { create } from 'zustand'
import { initSchedules } from '../services/calendar'

const DEFAULT_PROPS = {
    year: null,
    month: null,
    day: null,
    list: [],
}

const createCalendarStore = (initProps) => {
    return create((set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        getDate: () => {
            const { year, month, day } = get()
            return new Date(year, month - 1, (day || 1))
        },
        setDate: (date) => set(
            (state) => {
                const year = date.getFullYear()
                const month = date.getMonth() + 1  
            
                return {
                    ...state,
                    year: year,
                    month: month,
                    list: [
                        ...initSchedules(year, month)
                    ]
                }
            }
        ),
        prev: () => set(
            (state) => {
                const data = {}
                if(state.month === 1) {
                    data.year = state.year - 1
                    data.month = 12
                } else {
                    data.year = state.year
                    data.month = state.month - 1
                }

                return {
                    ...state,
                    ...data,
                    list: [
                        ...initSchedules(data.year, data.month)
                    ]
                }
            }
        ),
        next: () => set(
            (state) => {
                const data = {}
                if(state.month === 12) {
                    data.year = state.year + 1
                    data.month = 1
                } else {
                    data.year = state.year
                    data.month = state.month + 1
                }

                return {
                    ...state,
                    ...data,
                    list: [
                        ...initSchedules(data.year, data.month)
                    ]
                }
            }
        ),
        getSchedules: (index) => {
            return get().list[index]
        },
        createSchedule: (index, data) => set(
            (state) => {
                console.log(state)
                console.log(state.list[5].schedules.push({ 
                    id: 9, name: '테스트' 
                }))
                // console.log(state.list)
                const schedules = state.list[5].schedules

                const newData = state.list
                newData[5].schedules = [...schedules]
                // // console.log(state.list[5].schedules)
                return {
                    ...state,
                    list: [...newData]
                }
            }
        )
    }))
} 

const init = () => {
    const date = new Date()
    const year =  date.getFullYear()
    const month = date.getMonth() + 1

    return {
        year,
        month,
        list: [
            ...initSchedules(year, month)
        ]
    }
}

export const useCalendarStore = createCalendarStore(init())

