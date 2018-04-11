var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: 'talk-temple'
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    User.associate = function(models) {
        User.belongsToMany(models.Song, { through: 'users_songs'});
        User.belongsToMany(models.Video, { through: 'users_videos'});
        User.belongsToMany(models.Image, { through: 'users_images'});
        User.belongsToMany(models.Thought, { through: 'users_thoughts'});
    };

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    User.comparePassword = function(password, login_password) {
        return bcrypt.compareSync(login_password, password)
    }
    return User;
};

// order.associate = function (models) {
//   order.belongsToMany(models.product, { through: 'product_order', as: 'product' });
// };