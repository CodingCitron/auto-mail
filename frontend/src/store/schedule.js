import { create } from 'zustand'

// zustand docs: https://docs.pmnd.rs/zustand/getting-started/introduction
export const useScheduleStore = create(set => ({
    year: null,
}))