import "reflect-metadata"
import { DataSource } from "typeorm"

// https://orkhan.gitbook.io/typeorm/docs/usage-with-javascript
const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres", // 컨테이너 이름으로 설정
    port: 5432, // host port
    username: "postgres",
    password: "postgres",
    database: "postgres", // 기본 데이터베이스 인듯(?)
    synchronize: true, // 개발환경 true, 운영환경 false
    logging: false,
    entities: [
        "/src/entities/**/*.js"
    ],
    migrations: [],
    subscribers: [],
})

export default AppDataSource