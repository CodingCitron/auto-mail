import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { useModalStore } from '../../../store/modal'
import axios from 'axios'
import ScheduleDetailHeader from '../detailView/ScheduleDetailHeader'
import ScheduleDetailFooter from '../detailView/ScheduleDetailFooter'

ReactModal.setAppElement('#root')

const ScheduleDetailModal = ({ modalId, id }) => {
    const { close } = useModalStore(state => state)
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData() 

        async function fetchData() {
            try {
                const res = await axios.get(`/schedule/${id}`)
                setData({ ...res.data })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

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
    <ReactModal
        isOpen
        style={ModalStyle}
    >   
        <ScheduleDetailHeader
            title={data.title}
            handleClickCancel={onClose}
        />
        <div className='scheduleModal__main mb-4'>
            <h4 className='py-1 min-w-[50px] text-left font-semibold'>내용</h4>
            <div className='scheduleModal__cotent'>
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
        </div>
        <ScheduleDetailFooter 
            handleClickCancel={onClose}
        />
    </ReactModal>
  )
}

export default React.memo(ScheduleDetailModal)