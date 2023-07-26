import React, { useContext } from 'react'
import { ModalDispatchContext, ModalStateContext } from '../../context/modal'

const Modals = () => {
    const openedModals = useContext(ModalStateContext)
    const { close } = useContext(ModalDispatchContext)

    return openedModals.map((modal, index) => {
        const { Component, props } = modal
        const { onSubmit, ...restProps } = props

        const onClose = () => {
            close(Component)
        }

        const handleSubmit = async () => {
            if (typeof onSubmit === 'function') {
              await onSubmit()
            }

            onClose()
        }
      
        return (
            <Component 
                {...restProps}
                key={index}
                onClose={onClose}
                onSubmit={handleSubmit}
            />
        )
    })
}

export default Modals