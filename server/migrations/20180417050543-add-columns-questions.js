'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.addColumn(
      'Questions',
      'read',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
    ),
     queryInterface.addColumn(
      'Questions',
      'answered',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
    )
  },

  down: (queryInterface, Sequelize) => {
   queryInterface.removeColumn(
      'Questions',
      'Questions'
    ),
   queryInterface.removeColumn(
      'Questions',
      'answered'
    )
  },
};
