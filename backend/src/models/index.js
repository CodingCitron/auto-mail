import Sequelize from 'sequelize'; 
import process from 'process';
import Config from '../config/config.json' assert { type: "json" };
// console.log(Config)
// 참조: https://hojung-testbench.tistory.com/entry/ExpressSequelize-MySQL%EA%B3%BC-Express%EC%97%B0%EA%B2%B0-ES6

import User from './User.js';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = User(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db