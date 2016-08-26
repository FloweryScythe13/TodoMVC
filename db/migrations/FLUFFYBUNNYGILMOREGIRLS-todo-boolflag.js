'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos', 'completed', Sequelize.BOOLEAN);
  },
  
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos', 'completed');
  }
};