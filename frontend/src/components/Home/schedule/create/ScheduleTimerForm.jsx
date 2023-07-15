import React, { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import ReactDatePicker from 'react-datepicker'

const AlarmWrap = styled.div`
  margin-top: 12px;
`

const ScheduleTimerForm = ({ children, addSchedule, removeSchedule, memorizedKo }) => {
    const [time, setTime] = useState(null)

  return (
    <AlarmWrap>
        <div>
            <div>
                <h3>알람 설정</h3> {/* 추후에 로컬 프로그램으로 개발해서 알람 기능 구현 생각 */}
            </div>
            <div>

            </div>
        </div>
        <div className='flex gap-[12px]'>
            <div className='border flex-1'>
                { children }
            </div>  
            <div className='border flex-1'>
            <ReactDatePicker
                dateFormat="yyyy년 MM월 dd일 h:mm aa"
                className='p-1 border text-center w-full'
                placeholderText="날짜 시간 선택"
                locale={memorizedKo}
                onChange={setTime}
                selected={time}
                showTimeSelect
            />
            <input type="number" placeholder='횟수'/>
            <div>
                <div>
                <input type='checkbox' selected value='메일' />메일
                </div>
                <div>
                <input type='checkbox' value='카카오톡' />카카오톡
                </div>
            </div>
            <button onClick={addSchedule}>추가</button>
            <button onClick={removeSchedule}>삭제</button>
            </div>
        </div>
    </AlarmWrap>
  )
}

export default React.memo(ScheduleTimerForm)