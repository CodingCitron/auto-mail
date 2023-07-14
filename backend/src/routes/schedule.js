import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { Schedule } from "../models/index.js";
import { and, or, Op } from "sequelize";

const router = Router()

async function getSchedule(req, res, next) {
    console.log(req, res)
}

// https://s0n9h2.tistory.com/110
// https://stackoverflow.com/questions/29798357/sequelize-where-statement-with-date
async function getSchedules(req, res, next) {
    // console.log(req, res)
    const  { startDate, endDate, date, keyword, title, content, attribute, include, order } = req.query

    console.log(startDate, endDate)
    try {
        // 날짜 기간 검색 
        // ex) 6 ~ 8월 42일치 데이터 - 기간 검색
        const schedules = await Schedule.findAll({
            where: {
                writer: req.user.id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        }) 

        console.log(schedules)
        res.status(200).json(schedules)
    } catch (error) {
        // console.error(error)
        next(error)
    }
}

async function createSchedule(req, res, next) {
    // console.log(req, res)
    const { title, content, startDate, endDate, date } = req.body

    try {
        const schedule = await Schedule.create({
            writer: req.user.id,
            title: title,
            content: content,
            date: date,
        })

        res.status(200).json(schedule)
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
router.post('/', isLoggedIn, createSchedule)

export default router