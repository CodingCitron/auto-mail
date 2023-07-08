import { Router } from "express";
import bcrypt from 'bcryptjs'
import { User } from "../models/index.js";
import passport from 'passport'
import { isLoggedIn, isNotLoggedIn } from "../middlewares/auth.js";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        if(req.user) {
            const user = await User.findOne({
                where: { id: req.user.id },
                attibutes: {
                    exclude: ['password']
                }
            })
        
            res.json(200).json(user)
        } else {
            res.status(200).json(null)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (serverError, user, clientError) => {
        if(serverError) { // 서버 에러
            console.error(serverError)
            next(serverError)
        }

        if(clientError) {
            return res.status(401).status(clientError.reason) // 401 허가되지 않은 에러
        }

        return req.login(user, async (loginErr) => {
            if(loginErr) {
                console.error(loginErr)
                return next(loginErr)
            }

            delete user.password
            return res.status(200).json(user)
        })
    })(req, res, next)
})

router.post('/logout', isLoggedIn, async (req, res, next) => {
    req.logout()
    req.session.destroy()
    res.send('logout')
})

router.post('/register', isNotLoggedIn, async (req, res, next) => {
    const { email, password } = req.body

    try {
        const exUser = await User.findOne({
            where: {
                email
            }    
        })

        if(exUser) { 
            // 응답은 한번만 보내야 한다. 
            // 두번 보내면 에러
            return res.status(403).send('이미 사용중인 아이디입니다.')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            email: email,
            password: hashedPassword
        })

        res.status(201).send('success')
    } catch (error) {
        console.error(error)
        next(error) // express가 브라우저로 error를 보내줌 next는 status 500
    }
})

export default router