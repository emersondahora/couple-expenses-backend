import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Category from '../app/models/Category';
import CategoryDivision from '../app/models/CategoryDivision';
import PaymentForm from '../app/models/PaymentForm';
import Expense from '../app/models/Expense';
import ExpenseDivision from '../app/models/ExpenseDivision';

const models = [
  User,
  Category,
  CategoryDivision,
  PaymentForm,
  Expense,
  ExpenseDivision,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
