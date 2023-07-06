import express  from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import morgan from "morgan"

import planRoutes from './routes/plan.js'

dotenv.config()

const app = express() // express 서버를 생성
const origin = `http://localhost:3000` 

app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json()) // json 형태로 오는 요청의 본문을 해석해줄 수 있게 등록
app.use(morgan("dev")) // nodejs 로그 라이브러리
app.use(cookieParser()) 
app.use(express.static("public")) // public 폴더 사용

const port = 5000

app.use("/api/plan", planRoutes)

app.get("/", (_, res) => res.send("running"))
app.listen(port, () => console.log(`app listening on port ${port}`))
