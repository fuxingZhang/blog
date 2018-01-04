const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql', //the sql dialect of the database , currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'

  // you can also pass any dialect options to the underlying dialect library
  // - default is empty
  // - currently supported: 'mysql', 'postgres', 'mssql'
  // dialectOptions: {
  //   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  //   supportBigNumbers: true,
  //   bigNumberStrings: true
  // },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  //以下是老版本的
  // pool: {
  //   minConnections: 0,
  //   maxConnections: 500,
  //   maxIdleTime: 60 * 1000,
  // },

  define: {
    timestamps: true,       //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    underscored: true,      //转换列名的驼峰命名规则为下划线命令规则    [options.underscoredAll=false]  Boolean 转换模型名的驼峰命名规则为表名的下划线命令规则
    freezeTableName: true,  //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    paranoid: true,         //使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，而是设置一个 deletedAt 列。此设置需要 timestamps=true
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
  },
});

let models = {};

fs.readdirSync(__dirname).forEach(fileName => {
  console.log('name',fileName)
  if (fileName === 'index.js' ) return 
  let modelName = path.basename(fileName, '.js')
  console.log(modelName)
  models[modelName] = sequelize.import(path.join(__dirname, fileName))
});

module.exports = models;