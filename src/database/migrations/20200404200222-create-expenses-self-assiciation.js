module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('expenses', 'expense_original', {
      type: Sequelize.INTEGER,
      references: { model: 'expenses', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('expenses', 'expense_original');
  },
};
