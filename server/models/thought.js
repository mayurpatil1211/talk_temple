'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thought = sequelize.define('Thought', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    title: {
    	type:DataTypes.STRING,
    	allowNull: false
    },
    thought: {
    	type:DataTypes.STRING,
    	allowNull:false
    },
    author: {
    	type:DataTypes.STRING,
    	allowNull:true
    }
  });

  Thought.associate = function(models) {
    Thought.belongsToMany(models.User, {through:'users_thoughts', onDelete: 'cascade',hooks: true});
  }

  return Thought;
};
