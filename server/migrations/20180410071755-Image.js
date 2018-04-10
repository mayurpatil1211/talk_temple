'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
        'Images',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Images',
        'image',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
        'Images',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.changeColumn(
        'Images',
        'image',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
  }
};
