import Sequelize, { Model } from 'sequelize';

class ExpenseDivision extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'expenses_divisions',
        timestamps: false,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Expense, {
      foreignKey: 'expense_id',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
}

export default ExpenseDivision;
