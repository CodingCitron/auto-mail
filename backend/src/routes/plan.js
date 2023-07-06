import { Router } from "express";

const router = Router()

function getPlan(req, res) {
    console.log(req, res)
}

function createPlan () {
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
router.get('/', getPlan)
router.post('/', createPlan)

export default router