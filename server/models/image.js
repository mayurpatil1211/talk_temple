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
  return Image;
};