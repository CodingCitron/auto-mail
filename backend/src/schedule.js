// https://github.com/node-schedule/node-schedule
import schedule from 'node-schedule'
import db, { Timer, Schedule, User } from './models/index.js'
import { Op } from 'sequelize'
import { sendMail } from './mail.js'

export const scheduleList = []

// 서버가 열리면 status값이 ready인 데이터의 status를 모두 빈값으로 초기화
const initSchedlues = async () => {
    try {
        await Timer.update({ status: '' }, {
            where: {
                status: 'ready'
            }
        })
    
        const rows = await getSchedules()

        if(rows.length > 0) {
            rows.forEach(row => {
                setSchedule(row, () => {
                    console.log('테스트')
                })
            })
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * 규칙
 * 1. Date 값이 있으면 연속 불가 정확한 시간에 보내기
 * 2. Date 값이 없고, time 값이 있으면 반복 가능 
 * - 2번의 경우 count가 0이면 매일 그 시간에 보내기
 * 
 * gte >= 5 : 5 
 * gt > 5 : 5
 */
const getSchedules = async () => {
    const rows = await Timer.findAll({
        where: {
            status: { // ready가 아닌 것들
                [Op.or]: [
                    { [Op.eq]: null },
                    { [Op.eq]: '' },
                ]
            },
            [Op.or]: [ // OR
                { // or
                    date: {
                        [Op.gte]: new Date()
                    },
                    count: {
                        [Op.ne]: 0, // =
                        [Op.gt]: db.sequelize.col('count_history') // count_history가 같거나 더 크면
                    }
                },
                { // or 
                    time: {
                        [Op.ne]: null // null이 아닐때
                    },
                    date: null, // null일때
                    count: {
                        [Op.or]: {
                            [Op.eq]: 0,
                            [Op.gt]: db.sequelize.col('count_history') // 크면
                        }
                    }
                }
            ]
        }
    })

    return rows
}

const setSchedules = async () => {
    try {
        const rows = await getSchedules()

        if(rows.length > 0) {
            rows.forEach(row => {
                setSchedule(row, () => {
                    console.log('테스트')
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
} 

/**
 * 규칙 set동작 시
 * list에 data를 추가
 * list에 들어간 데이터는 status 값을 변경 = ready
 * callback까지 실행되면 
 */
const setSchedule = async (data, callback) => {
    let date
    let cron = '00000*'
    cron = [...cron]

    if(data.time === null) { // date 만
        date = data.date

        cron[4] = date.getMonth() + 1
        cron[3] = date.getDate()
    }

    if(data.date === null) { // time 만
        date = data.time

        cron[4] = '*'
        cron[3] = '*'
        cron[2] = date.getHours()
        cron[1] = date.getMinutes()
    } 

    // 둘다 NULL이 아니면

    cron = cron.join(' ')
    // console.log(cron)
    const job = schedule.scheduleJob(cron, async (a, b) => {
        // 실행이 되었을 때 
        // 데이터 가져오기
        // 실행 카운트 증가
        // count와 history_count가 같아지면 종료
        try {
            // callback()
            const timerData = await Timer.findOne({
                where: {
                    id: data.id
                },
                include: [
                    { model: Schedule },
                    { model: User }
                ]
            })

            // 메일 발송
            await sendMail({
                from: `Web-Planner <${timerData.User.email}>`,
                to: timerData.User.email,
                subject: timerData.Schedule.title,
                html: timerData.Schedule.content
            })

            const updated = await Timer.update({
                count_history: data.count_history += 1 // 히스토리 1증가
            }, {
                where: {
                    id: data.id
                },
                returning: true,
                plain: true,
            })

            const timer = updated[1]

            // 해당 스케쥴은 종료
            if(timer.count !== 0 && timer.count === timer.count_history) {
                const index = scheduleList.findIndex(item => item.id === timer.id)
                
                if(index !== -1) {
                    console.log('job 종료')
                    scheduleList[index].job.cancel() 
                    
                    // list에서 제거
                    scheduleList.splice(index, 1)
                }
            }
        } catch (error) {
            console.log(error)
        }
    })

    // job이 생성되었을 때
    if(job !== null) {
        try {
            // status update 
            const timer = await Timer.update({
                status: 'ready'
            }, {
                where: {
                    id: data.id
                }
            })

            console.log('job 생성')
            // console.log(job)
            // list에 넣기
            scheduleList.push({ 
                id: data.id, 
                cron: cron,
                job: job 
            })
            console.log(scheduleList)
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteScheduleInList = (id) => {
    const index = scheduleList.findIndex(schedule => schedule.id === id)
    
    if(index !== -1) {
        cancelSchedule(scheduleList.splice(index, 1))
    }
}

const cancelSchedule = (job, callback) => {
    job.cancel()
}

export {
    initSchedlues,
    getSchedules,
    setSchedule,
    setSchedules,
    cancelSchedule,
    deleteScheduleInList
}