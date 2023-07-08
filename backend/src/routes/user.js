import { Router, Router } from "express";
import User from "../models/User";

const router = Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        await User.create({
            email: email,
            password: password
        })

        res.json()
    } catch (error) {
        console.log(error)
    }
})

export default Router