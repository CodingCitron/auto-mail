import React from 'react'
import ReactModal from 'react-modal'

// 리액트 모달 에러
// https://velog.io/@seungsang00/React-React-Modal

// react modal style
// https://reactcommunity.org/react-modal/styles/
ReactModal.setAppElement('#root')

const PlanCreate = ({ onSubmit, onClose }) => {
  const handleClickSubmit = () => {
    onSubmit()
  }

  const handleClickCancel = () => {
    onClose()
  }

  return (
    <>
      <ReactModal isOpen>
        <div>
          <button onClick={handleClickSubmit}>확인</button>
          <button onClick={handleClickCancel}>취소</button>
        </div>
      </ReactModal>
    </>
  )
}

export default PlanCreate