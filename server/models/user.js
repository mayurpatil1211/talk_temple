var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:true,
      // defaultValue: 'talk-temple'
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull:true
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:true
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.generateHash = function (password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);}

  User.comparePassword=function(password, login_password){
    return bcrypt.compareSync(login_password, password)
  }
  return User;
};