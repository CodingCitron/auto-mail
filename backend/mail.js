const nodemailer = require('nodemailer')
require('dotenv').config()

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

async function sendMail({ from, to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from, // 보내는 곳
            to, // 받는 곳의 메일 주소를 입력
            subject, // 보내는 메일의 제목
            html, // html로 작성된 내용
        })  
    } catch (error) {
        console.log(error)
    }
}

export {
    transporter,
    sendMail
}