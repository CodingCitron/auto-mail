import passport from 'passport'
import local from './local.js'
import { User } from '../models/index.js'

export default () => {
    // 로그인을 했을 때 유저 아이디만 저장
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    // 아이디를 통해서 deserialize하고 유저 정보를 얻음
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } })

            done(null, user)
        } catch(error) {
            console.error(error)
            done(error)
        }   
    })

    local()
}