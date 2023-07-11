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

export const week = '일,월,화,수,목,금,토'.split(',')

export function getStartDate(year, month) {
    const day = new Date(year, month - 1, 1)
    const prevDateCount = week.findIndex(w => w === week[day.getDay()])

    return new Date(year, month - 1, 0 - (prevDateCount - 1))
}

export function initScheduleData (year, month) {
    // 1. API 요청
    // 2. schedules 데이터 필터링
    const result = []
    const date = new Date()

    const startDate = getStartDate(year, month)
    const days = dateFor(startDate, 42, (e, index) => {
        const { startDate, curDate, lastDate } = e 
        
        result.push({
            index,
            value: curDate.getDate(),
            today: date,
            day: curDate,
            schedules: []
        })
    })

    return result
}
