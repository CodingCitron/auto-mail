import React from 'react'

import ReactDatePicker from 'react-datepicker'
import ReactQuill from 'react-quill'

const ScheduleContentForm = ({ title, setTitle, date, setDate, content, setContent, memorizedKo }) => {
  return (
    <>
        {/* 일정명, 일시 */}
        <div className='mb-3'>
            <div className='flex gap-4 mb-3'>
                <h4 className='py-1 min-w-[50px] text-left'>일정명</h4>
                <input 
                    type='text'
                    value={title}
                    onChange={setTitle}
                    className='border p-1 flex-1'
                />
            </div>
            <div className='flex gap-4'>
                <h4 className='py-1 min-w-[50px] text-left'>일시</h4>
                <div className='flex-1 custom-datepicker'>
                    <ReactDatePicker
                        dateFormat="yyyy년 MM월 dd일"
                        className='p-1 border text-center w-full'
                        locale={memorizedKo}
                        selected={date}
                        onChange={setDate}
                        // showTimeSelect
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
    </>
  )
}

export default React.memo(ScheduleContentForm)