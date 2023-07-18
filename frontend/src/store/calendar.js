import { create } from 'zustand'
import { dateFor, filteredData, findIndex, getStartDate, setSchedules } from '../services/calendar'
import axios from 'axios'

const DEFAULT_PROPS = {
    year: null,
    month: null,
    day: null,
    list: [], 
    selectedDay: null, /* 선택된 Day */
    selectedSchedule: null /* 선택된 schedule 정보 */
}

const initProps = () => {
    const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1
    
    const startDate = getStartDate(year, month)
    const list = dateFor(startDate, 42, 
        ({ curDate }, index) => {
            return {
                index,
                date: curDate,
                schedules: []
            }
        }
    )

    return {
        year,
        month,
        list
    }
}

const createCalendarStore = () => {
    async function prev (set, get) {
        const { month, year } = get()
        const data = {}

        if(month === 1) {
            data.year = year - 1
            data.month = 12
        } else {
            data.year = year
            data.month = month - 1
        }
        
        const list = await setSchedules(data.year, data.month)
        
        return set(state => ({
            ...state,
            ...data,
            list
        }))
    }

    async function next (set, get) {
        const { month, year } = get()
        const data = {}

        if(month === 12) {
            data.year = year + 1
            data.month = 1
        } else {
            data.year = year
            data.month = month + 1
        }
        
        const list = await setSchedules(data.year, data.month)

        return set(state => ({
            ...state,
            ...data,
            list
        }))
    }

    function getDate(get) {
        const { year, month, day } = get()
        return new Date(year, month - 1, (day || 1))
    }

    async function setDate(date, set) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1  

        const list = await setSchedules(year, month)

        return set(state => ({
            ...state,
            year: year,
            month: month,
            list
        }))
    }

    async function initData (set, get) {
        const { year, month } = get()
        const list = await setSchedules(year, month)

        return set(state => ({
            ...state,
            list
        }))
    }

    async function setSchedule(data, set, get) {
        const { year, month } = get()
        const index = findIndex(year, month, data.date)

        if(index === -1) return

        return set(state => {
            const list = state.list.map(item => item.index === index ? 
                { ...item, schedules: [...item.schedules, data] } 
                : item
            )
            
            return {
                ...state,
                list
            }
        })
    }

    function selectDay(index, set, get) {
        return set(state => {
            return {
                ...state,
                selectedDay: {
                    ...state.list[index],
                    schedules: [...state.list[index].schedules]
                }
            }
        })
    }

    async function selectSchedule(info, set, get) {
        selectDay(info.index, set, get)

        try {
            const res = await axios.get(`/schedule/${info.id}`)

            const data = res.data
            
            set(state => ({
                ...state,
                selectedSchedule: {
                    ...data,
                    user: data.User.email,
                    timers: [...data.Timers]
                }
            }))

            console.log(get())
        } catch (error) {
            console.log(error)
        }
    }

    return create((set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps(),
        initData: () => initData(set, get),
        getDate: () => getDate(get),
        setDate: date => setDate(date, set),
        prev: () => prev(set, get),
        next: () => next(set, get),
        
        /* schedule crud */
        getSchedules: () => get().list,
        setSchedule: data => setSchedule(data, set, get),
        removeSchedule: () => set((state) => {}),
        updateSchedule: () => set((state) => {}),

        /* selected schedule */
        selectDay: (index) => selectDay(index, set, get),
        selectSchedule: (info) => selectSchedule(info, set, get)
    }))
} 

export const useCalendarStore = createCalendarStore()

