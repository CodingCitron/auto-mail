import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { Schedule, User, Timer } from "../models/index.js";
import { and, or, Op } from "sequelize";
import { setSchedules } from "../schedule.js";
// 시퀄라이즈: https://velog.io/@jujube0/Sequelize-%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0

const router = Router()

async function getSchedule(req, res, next) {
    const id = req.params.id

    try {
        const schedules = await Schedule.findOne({
            where: {
                id,
                writer_id: req.user.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['email']
                },
                {
                    model: Timer,
                }
            ],
        })

        res.status(200).json(schedules)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// https://s0n9h2.tistory.com/110
// https://stackoverflow.com/questions/29798357/sequelize-where-statement-with-date
async function getSchedules(req, res, next) {
    // console.log(req, res)
    const  { id, startDate, endDate, date, keyword, title, content, attribute, include, order } = req.query

    try {
        // 날짜 기간 검색 
        // ex) 6 ~ 8월 42일치 데이터 - 기간 검색
        const schedules = await Schedule.findAll({
            where: {
                writer_id: req.user.id,
                date: {
                    [Op.between]: [startDate, endDate]
                },
            },
            attributes: {
                exclude: ['content']
            },
            include: {
                model: User,
                attributes: ['email']
            },
        }) 

        res.status(200).json(schedules)
    } catch (error) {
        // console.error(error)
        next(error)
    }
}

async function createSchedule(req, res, next) {
    // console.log(req, res)
    const { title, content, startDate, endDate, date, scheduleList } = req.body
   
    try {
        const schedule = await Schedule.create({
            writer_id: req.user.id,
            title: title,
            content: content,
            date: date,
        })

        const modefiedList = scheduleList.map(item => ({
            ...item,
            creater_id: req.user.id,
            schedule_id: schedule.id,
        }))

        const timers = await Timer.bulkCreate(modefiedList)
        await setSchedules()

        res.status(200).json({
            id: schedule.id,
            writer_id: schedule.writer,
            title: schedule.title,
            date: schedule.date,
            created_at: schedule.created_at
        })
    } catch (error) {
        console.log(error)
        next(error)
    }   
}

async function scheduleDetail(req, res, next) {
    console.log(req, res)
}

/**
 * @swagger
 * paths:
 *  /api/schedule:
 *    get:
 *      summary: "계획 목록 가져오기"
 *      description: ""
 *      tags: [schedule]
 *      responses:
 *        "200":
 *          description: 보여지는 달력의 계획 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 */
router.get('/', isLoggedIn, getSchedules)
router.get('/:id', isLoggedIn, getSchedule)
router.post('/', isLoggedIn, createSchedule)

export default router