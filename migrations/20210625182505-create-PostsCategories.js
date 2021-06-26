'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostsCategories", {
      postid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PostsCategories")
  }
};