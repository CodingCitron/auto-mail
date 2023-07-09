import { Router } from "express";
import bcrypt from 'bcryptjs'
import { User } from "../models/index.js";
import passport from 'passport'
import { isLoggedIn, isNotLoggedIn } from "../middlewares/auth.js";

const router = Router()

const mapError = (errors) => {
    return errors.reduce((prev, err) => {
        prev[err.property] = Object.entries(err.constraints)[0][1]

        return prev
    }, {})
}

router.get('/', async (req, res, next) => {
    try {
        if(req.user) {
            const user = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                }
            })
        
            res.status(200).json(user)
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

            return res.status(200).json({
                id: user.id,
                email: user.email
            })
        })
    })(req, res, next)
})

router.post('/logout', isLoggedIn, async (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error)

        req.session.destroy()
        res.send('logout')
    })
})

router.post('/register', isNotLoggedIn, async (req, res, next) => {
    const { email, password, confirmPassword } = req.body
    const errors = {}

    try {
        if(email.trim() === '') errors.email = '이메일이 입력되지 않았습니다.'
        if(password.trim() === '') errors.password = '비밀번호가 입력되지 않았습니다.'
        if(confirmPassword.trim() === '') errors.confirmPassword = '비밀번호 확인이 입력되지 않았습니다.'

        if(password !== confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다.' 
        }

        const exUser = await User.findOne({
            where: {
                email
            }    
        })

        if(exUser) { 
            // 응답은 한번만 보내야 한다. 
            // 두번 보내면 에러
            errors.email = '이미 해당 이메일 주소가 사용되었습니다.'
        }

        if(Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
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
        // return res.status(500).json({ error }) 
    }
})

export default router