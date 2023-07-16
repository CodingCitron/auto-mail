import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import useInput from '../../../../hooks/useInput'

const AlarmWrap = styled.div`
  margin-top: 12px;
`

const checkList = [
    {
        id: 0,
        name: '메일',
        checked: true,
    },
    {
        id: 1,
        name: '카카오톡',
        checked: false,
    }
]

// https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
const ScheduleTimerForm = ({ scheduleList, setScheduleList, scheduleNextID, memorizedKo }) => {
    const [time, setTime] = useState(null)
    const [count, setCount] = useInput(1)
    const [check, setCheck] = useState(checkList)
    const [error, setError] = useState({
        time: '',
        count: '',
        check: '',
    })

    const checkEls = useRef([])

    const checkHandler = useCallback((id) => {
        setCheck(check.map(arr => (
            arr.id === id ? { ...arr, checked: !arr.checked } : arr
        )))
    }, [check])

    const labelClickHandler = useCallback((id, index) => {
        checkEls.current[index].focus()
        checkHandler(id)
    }, [check])

    const checkElement = useMemo(() => (
        checkList.map((data, index) => (
            <div key={data.id}>
                <input 
                    type='checkbox' 
                    selected 
                    value={data.name}
                    checked={check[index].checked}
                    ref={el => checkEls.current[index] = el}
                    onChange={e => checkHandler(data.id)} 
                /><label 
                    onClick={e => labelClickHandler(data.id, index)}
                >
                    {data.name}
                </label>
            </div>
        ))
    ), [check])

    const addSchedule = () => {
        console.log(time)

        let some = check.filter(item => item.checked === true)
        some = some.map(item => item.name).join(', ')

        const data = {
            id: scheduleNextID.current,
            time,
            count,
            some,
        }   
        
        console.log(some)

        setScheduleList([...scheduleList, data])
        scheduleNextID.current += 1

        console.log(scheduleList)
    }

    const removeSchedule = () => {
        
    }

    const dateFormat = useCallback(date => {
        const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(), 
        hour = date.getHours(),
        min = date.getMinutes()
        
        return `${year}.${month}.${day} 
        ${String(hour).length === 1 ? '0' + hour : hour } : ${String(min).length === 1 ? '0' + min : min }`
    }, [])

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
                <ul>
                    {
                        scheduleList.map((data, index) => (
                            <li 
                                key={index}
                                className='flex justify-between px-[4px] pt-[2px]'
                            >
                                <div>
                                    {data.id}. {data.some}    
                                </div>
                                <div className='flex gap-1'>
                                    { dateFormat(data.time) }
                                    <button>삭제</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>  
            <div className='border flex-1'>
                <ReactDatePicker
                    dateFormat="yyyy년 MM월 dd일 h:mm aa"
                    className='p-1 border text-center w-full'
                    placeholderText="날짜 시간 선택"
                    locale={memorizedKo}
                    onChange={setTime}
                    selected={time}
                    showTimeInput
                />
                <div>
                    { error.time }
                </div>
                <div>
                    <label>횟수</label>
                    <input 
                        type="number"
                        min="0"
                        placeholder='횟수 0 = ∞'
                        value={count}
                        onChange={setCount}    
                    />
                    <div>
                        { error.count }
                    </div>
                </div>
                <div>
                    { checkElement }
                    <div>
                        { error.check }
                    </div>
                </div>
                <div>
                    <button onClick={addSchedule}>추가</button>
                    <button onClick={removeSchedule}>삭제</button>
                </div>
            </div>
        </div>
    </AlarmWrap>
  )
}

export default React.memo(ScheduleTimerForm)