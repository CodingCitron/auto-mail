import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useCalendarStore } from '../../../../store/calendar'
import { ko } from 'date-fns/esm/locale'
import axios from 'axios'
import useInput from '../../../../hooks/useInput'

import ScheduleCreateHeader from '../create/ScheduleCreateHeader'
import ScheduleContentForm from '../create/ScheduleContentForm'
import ScheduleTimerForm from '../create/ScheduleTimerForm'
import ScheduleCreateFooter from '../create/ScheduleCreateFooter'

const ScheduleUpdate = ({ onClose, onSubmit, id, initTitle, initContent, initDate, user, timers }) => {
  console.log(timers)
    const [title, setTitle] = useInput(initTitle)
    const [content, setContent] = useState(initContent)
    const [date, setDate] = useState(new Date(initDate))
    const [scheduleList, setScheduleList] = useState([...timers])

    const scheduleNextID = useRef(0)

    const memorizedKo = useMemo(() => ko, [])
    const setSchedule = useCalendarStore(state => state.setSchedule)

    const removeSchedule = useCallback((data) => {
      const list = scheduleList.filter(item => item.id !== data.id)
      setScheduleList([...list])
    }, [scheduleList])

    const handleClickSubmit = useCallback(async () => {
        const newList = []
        
        for(let i = 0; i < scheduleList.length; i++) {
          newList.push(
            {
              id: scheduleList[i].id,
              date: scheduleList[i].date,
              time: scheduleList[i].time,
              type: scheduleList[i].type,
              count: scheduleList[i].count
            }
          )
        }

        try {
            const res = await axios.patch(`/schedule/${id}`, {
                title,
                content,
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                scheduleList: newList
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

    }, [title, content, date, scheduleList])

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
            removeSchedule={removeSchedule}
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

export default React.memo(ScheduleUpdate)

//ScheduleUpdate