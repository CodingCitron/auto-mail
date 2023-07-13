import React, { useCallback, useMemo, useState } from 'react'
import ReactQuill from 'react-quill'
import { useCalendarStore } from '../../../../store/calendar'
import ReactDatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import axios from 'axios'

const ScheduleCreate = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const memorizedKo = useMemo(() => ko, [])
    const create = useCalendarStore(state => state.createSchedule)

    const handleClickSubmit = useCallback(async () => {
        try {
            const res = await axios.post('/schedule', {
                title,
                content,
                startDate: startDate, // startDate.getTime() - 문자열
                endDate: endDate // endDate.getTime()
            })

            console.log(res)
            // create(res.data)

            return onSubmit()
        } catch (error) {
            console.error(error)
            // 생성 안됨
        } finally {
            onClose()
        }

    }, [title, content, startDate, endDate])

    const handleClickCancel = useCallback(() => onClose(

    ), [])

  return (
    <>
        <header className='flex justify-between'>
          <div>
            <h3 className='text-[16px]'>일정등록</h3>
          </div>
          <div>
            <button onClick={handleClickCancel}>
              {/* 취소 */}
              <span className="material-icons">
                close
              </span>
            </button>
          </div>
        </header>
        <div className='mt-4'>
          {/* 일정명, 일시 */}
          <div className='mb-3'>
            <div className='flex gap-4 mb-3'>
              <h4 className='py-1 min-w-[50px] text-left'>일정명</h4>
              <input 
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='border p-1 flex-1'
              />
            </div>
            <div className='flex gap-4'>
                <h4 className='py-1 min-w-[50px] text-left'>일시</h4>
                <div className='flex-1 custom-datepicker'>
                    <ReactDatePicker
                        dateFormat="yyyy년 MM월 dd일 h:mm aa"
                        className='p-1 border text-center w-full'
                        locale={memorizedKo}
                        selected={startDate}
                        onChange={setStartDate}
                        showTimeSelect
                    />
                </div>
                <div>
                    ~
                </div>
                <div className='flex-1 custom-datepicker'>
                    <ReactDatePicker
                        dateFormat="yyyy년 MM월 dd일 h:mm aa"
                        className='p-1 border text-center w-full'
                        locale={memorizedKo}
                        selected={endDate}
                        onChange={setEndDate}
                        showTimeSelect
                    />
                </div>
            </div>
          </div>
          {/* 상세 내용 */}
          <div> 
            {/* <h4>일정상세</h4> */}
            <ReactQuill 
              theme="snow" 
              value={content} 
              placeholder='일정상세'
              onChange={setContent} 
            />
          </div>
          {/* 메일 보내기 기능 설정 */}
          <div>

          </div>
        </div>
        {/* 일정등록, 취소 버튼 */}
        <footer className='mt-3 flex gap-2 justify-end'>
            <button 
                className='btn-normal auto p-1 rounded-sm'
                onClick={handleClickSubmit}
            >
                일정등록
            </button>
            <button 
                className='btn-normal auto p-1 rounded-sm'
                onClick={handleClickCancel}
            >
                취소
            </button>
        </footer>
    </>
  )
}

export default React.memo(ScheduleCreate)