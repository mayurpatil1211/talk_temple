module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
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
    image: {
    	type:DataTypes.STRING,
    	allowNull:false
    }

});

  Image.associate = function(models){
    Image.belongsToMany(models.User, {through:'users_images'})
  }
  
  return Image;
};