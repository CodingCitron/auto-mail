import Sequelize from 'sequelize'; 
import process from 'process';
import Config from '../config/config.json' assert { type: "json" };
// console.log(Config)
// 참조: https://hojung-testbench.tistory.com/entry/ExpressSequelize-MySQL%EA%B3%BC-Express%EC%97%B0%EA%B2%B0-ES6
// https://tempdev.tistory.com/34

import UserModel from './User.js';
import ScheduleModel from './Schedule.js';
import TimerModel from './Timer.js';
import SpecialDayModel from './SpecialDay.js';
import FileModel from './File.js';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

const defaultOption = {
  timestamps: true, // timestamps가 true면 created_at, updated_at 자동으로 생김
  underscored: true, // createdAt, created_at 차이
  paranoid: true, // soft delete 구현, hard delete할거면 false 하면됨
  // modelName: 'Plan', // 자바스크립트에서 사용하는 이름
  // tableName: 'plans', // 실제 디비에서 사용하는 이름
  charset: "utf8mb4", // utf8mb4 이모티콘도 사용가능 해짐 utf8
  collate: "utf8mb4_general_ci", // 한글 저장 utf8mb4_general_ci, utf8_general_ci
}

db.User = UserModel(sequelize, Sequelize, defaultOption)
db.Schedule = ScheduleModel(sequelize, Sequelize, defaultOption)
db.Timer = TimerModel(sequelize, Sequelize, defaultOption)
db.SpecialDay = SpecialDayModel(sequelize, Sequelize, defaultOption)
db.File = FileModel(sequelize, Sequelize, defaultOption)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
export const { User, Schedule, Timer, SpecialDay, File } = db