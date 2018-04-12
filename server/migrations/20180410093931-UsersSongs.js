'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('users_songs',
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
          songId:{
            type: Sequelize.INTEGER,
            references:{
              model:'Songs',
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
    queryInterface.dropTable('users_songs')

};
