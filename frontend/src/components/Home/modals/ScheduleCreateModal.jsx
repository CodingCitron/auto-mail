import React, { useCallback, useMemo } from 'react'
import ReactModal from 'react-modal'
import ScheduleCreate from '../schedule/create/ScheduleCreate'
import { useModalStore } from '../../../store/modal'

// 리액트 모달 에러
// https://velog.io/@seungsang00/React-React-Modal
ReactModal.setAppElement('#root')

// react modal style
// https://reactcommunity.org/react-modal/styles/
const ScheduleCreateModal = ({ modalId }) => {
  const { close } = useModalStore(state => state)

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
      borderRadius: '8px',
      padding: '0',
      maxWidth: '600px',
      width: '100%',
      overflow: 'initial',
      border: 'initial'
    }
  }), [])

  const onClose = useCallback((callback) => {
    close(modalId, callback)
  }, [])

  return (
    <>
      <ReactModal 
        isOpen
        style={ModalStyle}
      >
        <div className='scheduleModal'>
          <ScheduleCreate
            onClose={onClose}
          />
        </div>
      </ReactModal>
    </>
  )
}

export default React.memo(ScheduleCreateModal)