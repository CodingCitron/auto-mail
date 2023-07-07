// 사용 X

// import "reflect-metadata"
// import { DataSource } from "typeorm"
import { Sequelize } from 'sequelize'

// https://orkhan.gitbook.io/typeorm/docs/usage-with-javascript
// const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "postgres", // 컨테이너 이름으로 설정
//     port: 5432, // host port
//     username: "postgres",
//     password: "postgres",
//     database: "postgres", // 기본 데이터베이스 인듯(?)
//     synchronize: true, // 개발환경 true, 운영환경 false
//     logging: false,
//     entities: [
//         "/src/entities/**/*.js"
//     ],
//     migrations: [],
//     subscribers: [],
// })

// export default AppDataSource

// sequalize 공식: https://sequelize.org/docs/v6/getting-started/
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: 'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
})

async function connectToPostgres() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export {
    connectToPostgres
}