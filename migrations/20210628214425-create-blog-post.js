module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable("BlogPosts", {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      content:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      published: {
        type: Sequelize.DATE,
        isDate: true,
      },
      updated: {
        type: Sequelize.DATE,
        isDate: true,
      },
    });
    return BlogPostsTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("BlogPosts");
  }
};
