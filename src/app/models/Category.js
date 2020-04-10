import Sequelize, { Model, Op } from 'sequelize';

import CategoryDivision from './CategoryDivision';
import User from './User';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.CategoryDivision, { foreignKey: 'category_id' });
  }

  static async findCategory(category_id) {
    const category = await super.findByPk(category_id, {
      include: [{ model: CategoryDivision, include: [{ model: User }] }],
    });
    return category;
  }

  static async existsCategory(name, id = 0) {
    const category = await Category.findOne({
      where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: String(name).toLowerCase(),
      }),
    });
    return category ? Number(category.id) !== Number(id) : !!category;
  }
}

export default Category;
