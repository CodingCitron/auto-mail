import { useRef } from 'react'
import { create } from 'zustand'

const DEFAULT_PROPS = {
    nextId: 0,
    modals: []
}

function open(Component, props, set, get) {
    const { nextId } = get()

    set(state => ({
        ...state,
        nextId: nextId + 1,
        modals: [...state.modals, { 
            Component,  
            props: {
                ...props,
                id: nextId
            },
            id: nextId
        }],
    }))
}

function close(id, callback, set, get) {
    set(state => ({
        ...state,
        modals: [
            ...state.modals.filter(modal => modal.id !== id)
        ]
    }))
}

const createModalStore = () => {
    return create((set, get) => ({
        ...DEFAULT_PROPS,
        open: (component, props) => open(component, props, set, get),
        close: (id, callback) => close(id, callback, set, get)
    }))
}

export const useModalStore = createModalStore()