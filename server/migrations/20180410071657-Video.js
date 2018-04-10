'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
        'Videos',
        'video',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
        'Videos',
        'video',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
  }
};
