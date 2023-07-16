// https://github.com/node-schedule/node-schedule
import schedule from 'node-schedule'
import db, { Timer } from './models/index.js'
import { Op } from 'sequelize'

const scheduleList = []


/**
 * 규칙
 * 1. Date 값이 있으면 연속 불가 정확한 시간에 보내기
 * 2. Date 값이 없고, time 값이 있으면 반복 가능 
 * - 2번의 경우 count가 0이면 매일 그 시간에 보내기
 */
const getSchedules = async () => {
    const rows = await Timer.findAll({
        where: {
            [Op.or]: [ // OR
                { // or
                    date: {
                        [Op.gte]: new Date()
                    },
                    count: {
                        [Op.ne]: 0, // =
                        [Op.ne]: db.sequelize.col('count_history') // !=
                    }
                },
                { // or 
                    time: {
                        [Op.ne]: null
                    },
                    date: null,
                    count: {
                        [Op.eq]: 0, // =
                        [Op.ne]: db.sequelize.col('count_history') // !=
                    }
                }
            ]
        }
    })

    return rows
}

const setSchedule = (date, callback) => {
    const job = schedule.scheduleJob(date, callback)
}

const cancelSchedule = (job, callback) => {

}

export {
    getSchedules,
    setSchedule,
    cancelSchedule,
}