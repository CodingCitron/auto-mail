import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url"; 

const __dirname = fileURLToPath(new URL(".", import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const transporter = nodemailer.createTransport({
    // 사용하고자 하는 서비스
    service: 'gmail',
    // host를 gmail로 설정
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력, 'testmail@gmail.com'
      user: process.env.NODEMAILER_USER,
      // Gmail 패스워드 입력
      pass: process.env.NODEMAILER_PASS,
    }
})

// 메일 보내기
async function sendMail({ from, to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from, // 보내는 곳
            to, // 받는 곳의 메일 주소를 입력
            subject, // 보내는 메일의 제목
            html, // html로 작성된 내용
        })
        
        console.log('메일 발송')
    } catch (error) {
        console.log(error)
    }
}

// sendMail({
//     from: `"test" <dummyoub@gmail.com>`,
//     to: 'xectler@naver.com',
//     subject: '테스트',
//     html: '테스트'
// })

// sendMail({
//     from: `"test" <dummyoub@gmail.com>`,
//     to: 'mojo@tpay.co.kr',
//     subject: '테스트',
//     html: '테스트'
// })

export {
    transporter,
    sendMail
}