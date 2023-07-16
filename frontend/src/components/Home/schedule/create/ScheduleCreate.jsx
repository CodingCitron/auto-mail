import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useCalendarStore } from '../../../../store/calendar'
import { ko } from 'date-fns/esm/locale'
import axios from 'axios'
import useInput from '../../../../hooks/useInput'

import ScheduleCreateHeader from './ScheduleCreateHeader'
import ScheduleContentForm from './ScheduleContentForm'
import ScheduleTimerForm from './ScheduleTimerForm'
import ScheduleCreateFooter from './ScheduleCreateFooter'

const ScheduleCreate = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useInput('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState(new Date())
    const [scheduleList, setScheduleList] = useState([])

    const scheduleNextID = useRef(0)

    const memorizedKo = useMemo(() => ko, [])
    const setSchedule = useCalendarStore(state => state.setSchedule)

    const removeSchedule = useCallback((data) => {
      
    }, [])

    const handleClickSubmit = useCallback(async () => {
        try {
            const res = await axios.post('/schedule', {
                title,
                content,
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            })

            res.data.date = new Date(res.data.date) 

            setSchedule(res.data)
            return onSubmit()
        } catch (error) {
            console.log(error)
            // 생성 안됨
        } finally {
            onClose()
        }

    }, [title, content, date])

    const handleClickCancel = useCallback(() => onClose(

    ), [])

  return (
    <>
        <ScheduleCreateHeader 
          handleClickCancel={handleClickCancel}
        />
        <div className='mt-4'>
          <ScheduleContentForm
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            content={content}
            setContent={setContent}
            memorizedKo={memorizedKo}
          />
          {/* 메일 보내기 기능 설정 */}
          <ScheduleTimerForm
            memorizedKo={memorizedKo}
            scheduleList={scheduleList}
            scheduleNextID={scheduleNextID}
            setScheduleList={setScheduleList}
          >
          </ScheduleTimerForm>
        </div>
        {/* 일정등록, 취소 버튼 */}
        <ScheduleCreateFooter 
          handleClickSubmit={handleClickSubmit}
          handleClickCancel={handleClickCancel}
        />
    </>
  )
}

export default React.memo(ScheduleCreate)