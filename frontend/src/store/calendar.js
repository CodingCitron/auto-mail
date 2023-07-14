import { create } from 'zustand'
import { dateFor, filteredData, findIndex, getStartDate, setSchedules } from '../services/calendar'

const DEFAULT_PROPS = {
    year: null,
    month: null,
    day: null,
    list: [],
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
            list: [ ...list ]
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
            list: [ ...list ]
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
            list: [ ...list ]
        }))
    }

    async function initData (set, get) {
        const { year, month } = get()
        const list = await setSchedules(year, month)

        return set(state => ({
            ...state,
            list: [ ...list ]
        }))
    }

    async function setSchedule(data, set, get) {
        const { year, month } = get()
        const index = findIndex(year, month, data.date)

        if(index === -1) return

        return set(state => {
            const schedules = state.list[index].schedules
            state.list[index].schedules = [...schedules, { ...data }]

            return {
                ...state,
                list: [...state.list]
            }
        })
    }

    return create((set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps(),
        initData: () => initData(set, get),
        getDate: () => getDate(get),
        setDate: date => setDate(date, set),
        prev: () => prev(set, get),
        next: () => next(set, get),
        getSchedules: () => get().list,
        setSchedule: data => setSchedule(data, set, get),
        removeSchedule: () => set((state) => {}),
        updateSchedule: () => set((state) => {}),
    }))
} 

export const useCalendarStore = createCalendarStore()

