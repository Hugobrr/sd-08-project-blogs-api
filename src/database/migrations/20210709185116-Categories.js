module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Categories'),
};
