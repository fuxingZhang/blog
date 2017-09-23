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
    dialectOptions: {
      socketPath: "/var/lib/mysql/mysql.sock"
    },
    define: {
        paranoid: true
    }
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