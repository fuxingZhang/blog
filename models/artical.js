module.exports = function(sequelize, DateTypes){
	return sequelize.define('artical', {
    id: {
      type: DateTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键"
    },
	  title: {
      type: DateTypes.STRING,
      unique: true,
      allowNull: false,
      comment: "标题"
    },
	  tag: {
      type: DateTypes.STRING,
      allowNull: false,
      comment: "标签"
    },
	  summary: {
	  	type: DateTypes.TEXT,
      allowNull: false,
      comment: "摘要"
    },
    content: {
	  	type: DateTypes.TEXT('long'),
      allowNull: false,
      comment: "内容"
    }
	},{
    comment: "文章表",
    indexes: [
      {
        fields: ["title"]
      },
      {
        fields: ["tag"]
      }
    ]
  })
}