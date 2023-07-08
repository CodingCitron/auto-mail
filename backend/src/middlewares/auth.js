function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()) {
        next() // 매개변수를 넣으면 error 없으면 다음 미들웨어로 연결
    } else {
        res.status(401).send('로그인이 필요합니다.')
    }
}

function isNotLoggedIn (req, res, next) {
    if(!req.isAuthenticated()) {
        next() // 매개변수를 넣으면 error 없으면 다음 미들웨어로 연결
    } else {
        res.status(401).send('로그인 하지 않은 사용자만 접근 가능합니다.')
    }
}

export { isLoggedIn, isNotLoggedIn }