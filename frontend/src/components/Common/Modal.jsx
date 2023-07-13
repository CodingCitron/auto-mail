import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ children }) => {
  return (
    <ReactModal isOpen ariaHideApp={false}>
        { children }
    </ReactModal>
  )
}

export default React.memo(Modal)