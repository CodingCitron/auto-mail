import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import useInput from '../../../../hooks/useInput'

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
        disabled: true
    }
]

// https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
const ScheduleTimerForm = ({ scheduleList, setScheduleList, scheduleNextID, memorizedKo, removeSchedule }) => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [count, setCount] = useInput(1)
    const [check, setCheck] = useState(checkList)
    const [error, setError] = useState({
        date: '',
        time: '',
        count: '',
        check: '',
    })

    const [focus, setFocus] = useState(null)

    const checkEls = useRef([])

    const checkHandler = useCallback((id) => {
        setCheck(check.map(arr => (
            arr.id === id ? { ...arr, checked: !arr.checked } : arr
        )))
    }, [check])

    const labelClickHandler = useCallback((data, index) => {
        if(data.disabled) return
        
        checkEls.current[index].focus()
        checkHandler(data.id)
    }, [check])

    const checkElement = useMemo(() => (
        checkList.map((data, index) => (
            <div 
                key={data.id}
                className='flex gap-1 w-1/2'
            >
                <input 
                    type='checkbox' 
                    selected 
                    value={data.name}
                    checked={check[index].checked}
                    ref={el => checkEls.current[index] = el}
                    onChange={e => checkHandler(data.id)}
                    disabled={data.disabled || false}
                /><label 
                    onClick={e => labelClickHandler(data, index)}
                >
                    {data.name}
                </label>
            </div>
        ))
    ), [check])

    const addSchedule = () => {
        // console.log(time)
        let some = check.filter(item => item.checked === true)
        some = some.map(item => item.name).join(', ')

        const data = {
            id: scheduleNextID.current,
            date,
            time,
            count,
            some,
        }   
        
        console.log(some)

        setScheduleList([...scheduleList, data])
        scheduleNextID.current += 1

        console.log(scheduleList)
    }

    const dateFormat = useCallback(date => {
        if(!date) return
        const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate()
        
        return `${year}.${month}.${day}` 
    }, [])

    const timeFormat = useCallback(time => {
        if(!time) return 
        if(typeof time === 'string') time = new Date(time)
        
        const hour = time.getHours()
        const min = time.getMinutes()

        return `${String(hour).length === 1 ? '0' + hour : hour } : ${String(min).length === 1 ? '0' + min : min }`
    }, [])  

    const focusedSchedule = useCallback((id) => {
        const defaultClassName = 'flex justify-between px-[4px] pt-[2px]'
        return focus === id ? `${defaultClassName} bg-cyan-500` : `${defaultClassName}`
    }, [focus])

  return (
    <div className='mt-4'>
        <div className='mb-1'>
            <div>
                <h3 className='font-semibold'>알람 설정</h3> {/* 추후에 로컬 프로그램으로 개발해서 알람 기능 구현 생각 */}
            </div>
            <div>

            </div>
        </div>
        <div className='flex gap-4'>
            <div className='flex-1'>
                <ul>
                    {   scheduleList.length > 0 &&
                        scheduleList.map((data, index) => (
                            <li 
                                key={index}
                                className={focusedSchedule(data.id)}
                                onClick={e => setFocus(data.id)}
                            >
                                <div>
                                    {data.id}. {data.some}    
                                </div>
                                <div className='flex gap-1'>
                                    <span>{ dateFormat(data.date) }</span>
                                    <span>{ timeFormat(data.time) }</span>
                                    <button onClick={() => removeSchedule(data)}>삭제</button>
                                </div>
                            </li>
                        ))
                    }
                    {
                        scheduleList.length === 0 &&
                        (
                            <li>
                                생성된 알람이 없습니다.
                            </li>
                        )
                    }
                </ul>
            </div>  
            <div className='flex-1'>
                <ReactDatePicker
                    dateFormat="yyyy년 MM월 dd일"
                    className='p-1 border text-center w-full'
                    placeholderText="날짜 선택"
                    locale={memorizedKo}
                    onChange={setDate}
                    selected={date}
                    isClearable
                />
                <ReactDatePicker
                    dateFormat="h:mm aa"
                    className='p-1 border text-center w-full'
                    placeholderText="시간 선택"
                    locale={memorizedKo}
                    onChange={setTime}
                    selected={time}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    isClearable
                />
                <div>
                    { error.time }
                </div>
                <div className='mb-2'>
                    <div className='flex justify-between'>
                        <label className='center font-semibold'>횟수</label>
                        <input 
                            type="number"
                            min="0"
                            placeholder='횟수 0 = ∞'
                            value={count}
                            onChange={setCount}    
                        />
                    </div>
                    <div>
                        { error.count }
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='flex justify-between'>
                        { checkElement }
                    </div>
                    <div>
                        { error.check }
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button onClick={addSchedule}>알람 생성하기</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ScheduleTimerForm)