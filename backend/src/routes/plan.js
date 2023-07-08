import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";

const router = Router()

async function getPlans(req, res, next) {
    console.log(req, res)
}

async function planDetail(req, res, next) {
    console.log(req, res)
}

async function createPlan (req, res, next) {
    console.log(req, res)
}

/**
 * @swagger
 * paths:
 *  /api/plan:
 *    get:
 *      summary: "계획 목록 가져오기"
 *      description: ""
 *      tags: [plan]
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
router.get('/', isLoggedIn, getPlans)
router.post('/', isLoggedIn, createPlan)

export default router