import express  from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import cookieParser from "cookie-parser"
import morgan from "morgan"

import db from "./models/index.js"
import passport from "passport"
import passportConfig from './passport/index.js'

import path from 'path'
import { fileURLToPath } from "url"

import { swaggerUi, specs } from "./swagger.js"
import planRouter from './routes/plan.js'
import userRouter from './routes/user.js'

const __dirname = fileURLToPath(new URL(".", import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const app = express() // express 서버를 생성
const origin = `http://localhost:3000` 
passportConfig()

app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json()) // json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(express.urlencoded({ extended: true })) // form 방식일때

app.use(cookieParser('webplannersecret')) 
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'webplannersecret'
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(morgan("dev")) // nodejs 로그 라이브러리
app.use(express.static("public")) // public 폴더 사용

const port = 5000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

app.use("/api/user", userRouter)

/**
 * @swagger
 * tags:
 *   name: plan
 *   description: 계획 정보 관리
 */
app.use("/api/plan", planRouter)

// app.get("/", (_, res) => res.send("running"))
// 에러 처리 미들웨어 에러시 동작 변경할 떄 사용
// app.use((err, req, res, next) => {})

app.listen(port, async () => {
    // AppDataSource.initialize().then(async () => {
    //     console.log("database initialized")
    // }).catch(error => console.log(error))

    console.log(`app listening on port ${port}`)

    try {
        await db.sequelize.sync()
        console.log('sql connected')
    } catch (error) {
        console.log(error)
    } 
})

