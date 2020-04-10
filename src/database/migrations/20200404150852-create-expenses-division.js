module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('expenses_divisions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      expense_id: {
        type: Sequelize.INTEGER,
        references: { model: 'expenses', key: 'id' },
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
      amount: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('expenses_divisions');
  },
};
