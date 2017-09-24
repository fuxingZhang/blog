const Sequelize = require('sequelize')
const config = require('../config/config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    // dialectOptions: {
    //   socketPath: "/var/lib/mysql/mysql.sock"
    // },
    //	使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，
    //而是设置一个 deletedAt 列。此设置需要 timestamps=true
    // define: {                 
    //     paranoid: true
    // }
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// sequelize.sync();

User.sync({force: false}).then(() => {
  // Table created
  return User.create({
      firstName: 'John',
      lastName: 'Hancock'
  });
});

User.findAll().then(users => {
  console.log(users)
})