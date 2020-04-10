module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('payment_forms', 'expiration_day', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('payment_forms', 'expiration_day');
  },
};
