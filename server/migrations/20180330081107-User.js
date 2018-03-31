'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Users', 'password',{
      
        type: Sequelize.STRING,
        allowNull: true
   
    }),
  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('Users'),
};

// queryInterface.changeColumn(
//   'nameOfAnExistingTable',
//   'nameOfAnExistingAttribute',
//   {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//     defaultValue: 0.0
//   }
// )