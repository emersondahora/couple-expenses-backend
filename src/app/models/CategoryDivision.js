import Sequelize, { Model } from 'sequelize';

class CategoryDivision extends Model {
  static init(sequelize) {
    super.init(
      {
        percent: Sequelize.FLOAT,
      },
      {
        sequelize,
        tableName: 'categories_divisions',
        timestamps: false,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
}

export default CategoryDivision;
