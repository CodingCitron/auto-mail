import { create } from 'zustand'

const DEFAULT_PROPS = {
    list: []
}

const store = (set) => ({
    ...DEFAULT_PROPS
})

export const useModalStore = create(store)

