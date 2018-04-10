'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    title: {
    	type:DataTypes.STRING,
    	allowNull:false
    },
    video: {
    	type:DataTypes.STRING,
    	allowNull:false
    }
  });

  return Video;
};


