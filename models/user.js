module.exports = function(sequelize, DateTypes){
	return sequelize.define('user', {
	  name:  DateTypes.STRING,
	  email:  DateTypes.STRING,
	  password:  DateTypes.STRING,
	})
}
