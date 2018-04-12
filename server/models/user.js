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
        User.belongsToMany(models.Song, { through: 'users_songs', onDelete: 'cascade',hooks: true});
        User.belongsToMany(models.Video, { through: 'users_videos', onDelete: 'cascade',hooks: true});
        User.belongsToMany(models.Image, { through: 'users_images', onDelete: 'cascade',hooks: true});
        User.belongsToMany(models.Thought, { through: 'users_thoughts', onDelete: 'cascade',hooks: true});
        User.hasMany(models.Question, {foreignKey:{name:'userId', allowNull:false}, onDelete: 'cascade',hooks: true});
    };

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    User.comparePassword = function(password, login_password) {
        return bcrypt.compareSync(login_password, password)
    }
    return User;
};

// User.hasMany(Picture, {
//   foreignKey: {
//     name: 'uid',
//     allowNull: false
//   }
// })

// Orders.hasMany(models.lines, { 
//   onDelete: 'cascade',
//   hooks: true, 
// });


// order.associate = function (models) {
//   order.belongsToMany(models.product, { through: 'product_order', as: 'product' });
// };