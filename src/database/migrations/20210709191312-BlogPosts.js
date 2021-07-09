module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('blogposts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
    published: { type: Sequelize.DATE },
    updated: { type: Sequelize.DATE },
  }),
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('blogposts'),
};
