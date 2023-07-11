// 날짜 for문 돌리기: https://jsikim1.tistory.com/108#google_vignette
function getDatesStartToLast(startDate, lastDate) {
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

function dateFor(startDate, count, callback) {
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

export {
    getDatesStartToLast,
    dateFor
}