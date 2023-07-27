import { create } from 'zustand'

const DEFAULT_PROPS = {
    modals: []
}

const store = (set, get) => ({
    ...DEFAULT_PROPS
})

export const useModalStore = create(store)

