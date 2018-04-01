module.exports = function(sequelize, DateTypes){
	return sequelize.define('view', {
	  view:  DateTypes.STRING
	})
}
