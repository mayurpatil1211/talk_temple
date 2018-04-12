'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('users_images',
        {
          id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
          },
          userId:{
            type: Sequelize.INTEGER,
            references:{
              model: 'Users',
              key : 'id'
            },
            allowNull:false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          imageId:{
            type: Sequelize.INTEGER,
            references:{
              model:'Images',
              key: 'id'
            },
            allowNull:false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        }),
  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('users_images')

};
