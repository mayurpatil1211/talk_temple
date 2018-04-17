'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
  	 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    question: {
    	type:DataTypes.STRING
    },
    userId: {
    	type:DataTypes.INTEGER
    },
    answer: {
    	type:DataTypes.STRING
    },
    read: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    answered: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
  Question.associate = function(models) {
    Question.belongsTo(models.User, {onDelete: 'cascade',hooks: true})
  };
  return Question;
};
