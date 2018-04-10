'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
        'Songs',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Songs',
        'song',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
        'Songs',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.changeColumn(
        'Songs',
        'song',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
  }
};
