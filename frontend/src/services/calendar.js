import axios from "axios"

// 날짜 계산 관련: https://gurtn.tistory.com/113
// 날짜 for문 돌리기: https://jsikim1.tistory.com/108#google_vignette
export function getDatesStartToLast(startDate, lastDate) {
	const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
	if(!(regex.test(startDate) && regex.test(lastDate))) return 'Not Date Format'

	const result = []
	const curDate = new Date(startDate)
    
	while(curDate <= new Date(lastDate)) {
		result.push(curDate)
		curDate.setDate(curDate.getDate() + 1)
	}

	return result
}

export function dateFor(startDate, count, callback) {
    const array = []
    const curDate = new Date(startDate)

    const lastDate = new Date(startDate)
    lastDate.setDate(startDate.getDate() + count)
    
    let cnt = 0

    while(curDate < new Date(lastDate)) {
        array.push(callback({
            startDate: new Date(startDate),
            curDate: new Date(curDate),
            lastDate: new Date(lastDate),
        }, cnt))

        curDate.setDate(curDate.getDate() + 1)
        cnt++
    }

    return array
}

export function getIndexDate(year, month, index) {
    const startDate = getStartDate(year, month)

    if(index === 0) return startDate
    else {
        const indexDate = new Date(startDate)
        indexDate.setDate(startDate.getDate() + index)

        return indexDate
    }
}

export const week = '일,월,화,수,목,금,토'.split(',')

export function getStartDate(year, month) {
    const day = new Date(year, month - 1, 1)
    const prevDateCount = week.findIndex(w => w === week[day.getDay()])

    return new Date(year, month - 1, 0 - (prevDateCount - 1))
}

export function getEndDate(year, month) {
    const startDate = getStartDate(year, month)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 41)

    return endDate
}

export function filteredData (startDate, count, data) {
    return dateFor(startDate, 42, ({ curDate }, index) => {
            const filtered = data.filter(schedule => includeDay(
                    {
                        startDate,
                        a: schedule.date,
                        b: curDate
                    }
                )
            )
            
            return filtered
            // return filtered.map(schedule => ({...schedule, index: index}))
        }
    )
}

export function findIndex(year, month, date) {
    const startDate = getStartDate(year, month)
    const endDate = getEndDate(year, month)

    if(!includes(startDate, endDate, date)) return -1
    
    const diffDate = startDate.getTime() - date.getTime()
    return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)))
}

export function diffDay(first, second) {
    let diffTime = first.getTime() - second.getTime()
    return diffTime / (1000 * 60 *60 * 24)
}

export async function setSchedules(year, month) {
    const count = 42
    const startDate = getStartDate(year, month)
    const endDate = getEndDate(year, month)

    try {
        const res = await axios.get('/schedule', {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })

        const data = res.data.map(schedule => {
            schedule.date = new Date(schedule.date)
            return schedule
        })

        const schedules = filteredData(startDate, count, data)

        return dateFor(
            startDate, 42, 
            ({ curDate }, index) => {
            
            return {
                index,
                date: curDate,
                schedules: schedules[index]
            }
        })

    } catch (error) {
        console.log(error)

        return dateFor(
            startDate, 42, 
            ({ curDate }, index) => {
            
            return {
                index,
                date: curDate,
                schedules: []
            }
        })
    }
}

export function includeDay({ startDate, a, b }) {
    return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

export function includes( start, end, date ) {
    // console.log('add:',date.getTime())
    // console.log('end:', end.getTime())
    
    return start.getTime() <= date.getTime() && end.getTime() >= date.getTime()
}