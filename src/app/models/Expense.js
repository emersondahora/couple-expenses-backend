import Sequelize, { Model } from 'sequelize';

import ExpenseDivision from './ExpenseDivision';

class Expense extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        expense_date: Sequelize.DATEONLY,
        month: Sequelize.DATEONLY,
        installment_current: Sequelize.INTEGER,
        installment_total: Sequelize.INTEGER,
        amount: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.ExpenseDivision, {
      foreignKey: 'expense_id',
      as: 'divisions',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.PaymentForm, {
      foreignKey: 'payment_form_id',
      as: 'paymentform',
    });
    this.belongsTo(models.Expense, {
      foreignKey: 'expense_original',
      as: 'original_expense',
    });
  }

  static async create(expenseData, division) {
    const expense = await super.create(expenseData);

    const divisions = await Promise.all(
      division.map(divisionItem => {
        return ExpenseDivision.create({
          expense_id: expense.id,
          ...divisionItem,
        });
      })
    );

    expense.divisions = divisions;
    return expense;
  }
}

export default Expense;
