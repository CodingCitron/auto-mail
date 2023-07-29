import React from 'react'
import { useModalStore } from '../../store/modal'

const Modals = () => {
    const { modals } =  useModalStore(state => state)

    return modals.map((modal, index) => {
        const { Component, props } = modal
        const { ...restProps } = props

        return (
            <Component 
                {...restProps}
                key={index}
            />
        )
    })
}

export default React.memo(Modals)