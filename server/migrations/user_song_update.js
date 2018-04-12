'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint('users_songs', ['songId'],{
      
        type: 'foreign key',
        name: 'songId',
        allowNull: false,
        references: { //Required field
		    table: 'Songs',
		    field: 'id'
		  },
        onDelete : 'cascade',
        onUpdate: 'cascade'
   
    }),
  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('users_songs'),
};
