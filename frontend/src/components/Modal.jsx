import React from 'react'
import ReactModal from 'react-modal'

const Modal = ({ children, isOpen }) => {
  return (
    <ReactModal isOpen ariaHideApp={false}>
        <div className='modal-backdrop'>
            <div>
                <header>
                    <h3>일정등록</h3>
                </header>
                <div>
                    { children }
                </div>
                <footer></footer>
            </div>
        </div>
    </ReactModal>
  )
}

export default Modal