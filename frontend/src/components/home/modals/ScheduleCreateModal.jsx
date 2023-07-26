import React, { useMemo } from 'react'
import ReactModal from 'react-modal'
import ScheduleCreate from '../schedule/create/ScheduleCreate'

// 리액트 모달 에러
// https://velog.io/@seungsang00/React-React-Modal
ReactModal.setAppElement('#root')

// react modal style
// https://reactcommunity.org/react-modal/styles/
const ScheduleCreateModal = ({ onSubmit, onClose }) => {
  const ModalStyle = useMemo(() => ({
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    content: {
      position: 'relative',
      inset: 'initial',
      // maxWidth: '400px',
      padding: '12px 16px',
      maxWidth: '600px',
      width: '100%',
      overflow: 'initial'
    }
  }))

  return (
    <>
      <ReactModal 
        isOpen
        style={ModalStyle}
      >
          <ScheduleCreate 
            onClose={onClose}
            onSubmit={onSubmit}
          />
      </ReactModal>
    </>
  )
}

export default React.memo(ScheduleCreateModal)