'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
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
    song: {
    	type:DataTypes.STRING,
    	allowNull:false
    }
  });

  Song.associate = function(models){
    Song.belongsToMany(models.User, {through:'users_songs'})
  }

  return Song;
};


// order.associate = function (models) {
//   order.belongsToMany(models.product, { through: 'product_order', as: 'product' });
// };