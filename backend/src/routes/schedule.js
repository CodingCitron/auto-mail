import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { Schedule } from "../models/index.js";

const router = Router()

async function getSchedule(req, res, next) {
    console.log(req, res)
}

async function scheduleDetail(req, res, next) {
    console.log(req, res)
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
router.get('/', isLoggedIn, getSchedule)
router.post('/', isLoggedIn, createSchedule)

export default router