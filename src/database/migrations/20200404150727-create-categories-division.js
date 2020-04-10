module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories_divisions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      percent: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('categories_divisions');
  },
};
