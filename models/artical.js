module.exports = function(sequelize, DateTypes){
	return sequelize.define('tag', {
	  tag:  DateTypes.STRING
	})
}
