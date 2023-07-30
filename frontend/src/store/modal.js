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
                modalId: nextId
            },
            modalId: nextId
        }],
    }))
}

function close(modalId, callback, set, get) {
    set(state => ({
        ...state,
        modals: [
            ...state.modals.filter(modal => modal.modalId !== modalId)
        ]
    }))
}

// function getModalInfo (modalId, get) {

// }

const createModalStore = () => {
    return create((set, get) => ({
        ...DEFAULT_PROPS,
        open: (component, props) => open(component, props, set, get),
        close: (modalId, callback) => close(modalId, callback, set, get)
    }))
}

export const useModalStore = createModalStore()