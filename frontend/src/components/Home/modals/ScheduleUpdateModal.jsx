import React, { useMemo } from 'react'
import ReactModal from 'react-modal'
import ScheduleUpdate from '../schedule/update/ScheduleUpdate'

// 리액트 모달 에러
// https://velog.io/@seungsang00/React-React-Modal
ReactModal.setAppElement('#root')

// react modal style
// https://reactcommunity.org/react-modal/styles/
const ScheduleUpdateModal = ({ id, title, content, date, user, timers, onSubmit, onClose }) => {
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
  }), [])
  
  return (
    <>
      <ReactModal 
        isOpen
        style={ModalStyle}
      >
          <ScheduleUpdate
            id={id}
            initTitle={title}
            initContent={content}
            initDate={date}
            user={user}
            timers={timers}
            onClose={onClose}
            onSubmit={onSubmit}
          />
      </ReactModal>
    </>
  )
}

export default React.memo(ScheduleUpdateModal)