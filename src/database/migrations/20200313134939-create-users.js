module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      display_color: {
        type: Sequelize.STRING,
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
