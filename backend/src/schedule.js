// https://github.com/node-schedule/node-schedule
import schedule from 'node-schedule'

const scheduleList = []

const setSchedule = (date, callback) => {
    const rule = new schedule.RecurrenceRule()

    rule.dayOfWeek = [0, new schedule.Range(4, 6)]
    rule.hour = 17
    rule.minute = 0

    const job = schedule.scheduleJob(rule, callback)

    scheduleList.push(job)
    return job
}

const cancelSchedule = (job, callback) => {

}

export {
    setSchedule
}