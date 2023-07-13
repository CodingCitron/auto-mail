import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { Schedule } from "../models/index.js";
import { and, or } from "sequelize";

const router = Router()

async function getSchedule(req, res, next) {
    console.log(req, res)
}

// https://s0n9h2.tistory.com/110
// https://stackoverflow.com/questions/29798357/sequelize-where-statement-with-date
async function getSchedules(req, res, next) {
    console.log(req, res)
    const  { startDate, endDate, keyword, title, content, attribute, include, order } = req.body

    try {
        // 날짜 기간 검색 
        // ex) 6 ~ 8월 42일치 데이터 - 기간 검색
        const schedules = await Schedule.findAll({
            where: {
                [and]: [
                    {
                        [or]: [
                            {
                                start_date: [Op.lte]
                            }
                        ]
                    },
                    {
                        [or]: [

                        ]
                    }
                ]
            }
        }) 


    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function createSchedule(req, res, next) {
    // console.log(req, res)
    const { title, content, startDate, endDate } = req.body

    try {
        const schedule = await Schedule.create({
            writer: req.user.id,
            title: title,
            content: content,
            start_date: startDate,
            end_date: endDate,
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