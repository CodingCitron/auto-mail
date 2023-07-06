import { Router } from "express";

const router = Router()

function getPlan(req, res) {
    console.log(req, res)
}

function createPlan () {
    console.log(req, res)
}

router.get('/', getPlan)
router.post('/', createPlan)

export default router