import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models/index.js' 
import bcrypt from 'bcryptjs'

export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            })

            if(!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' }) 
            }

            const result = await bcrypt.compare(password, user.password)

            if(result) {
                return done(null, user)
            }

            return done(null, false, { reason: '비밀번호가 틀렸습니다.' }) // 첫 번째 매개변수 서버 에러
        } catch (error) {
            return done(error)
        }
    }))
}