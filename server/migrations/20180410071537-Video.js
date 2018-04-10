'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
        'Videos',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
        'Videos',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
  }
};
