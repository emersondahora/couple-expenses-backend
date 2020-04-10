import * as Yup from 'yup';

import Category from '../models/Category';
import CategoryDivision from '../models/CategoryDivision';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      division: Yup.array().of(
        Yup.object().shape({
          user_id: Yup.number().required(),
          percent: Yup.number().required(),
        })
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    if (
      req.body.division.reduce(
        (amount, division) => amount + division.percent,
        0
      ) !== 100
    ) {
      return res
        .status(400)
        .json({ error: 'A soma das porcentagens tem que ser igual a 100%' });
    }
    if (await Category.existsCategory(req.body.name)) {
      return res.status(400).json({ error: 'Categoria já existe.' });
    }

    const category = await Category.create({
      name: req.body.name,
    });

    await Promise.all(
      req.body.division.map(divisionItem => {
        return CategoryDivision.create({
          category_id: category.id,
          ...divisionItem,
        });
      })
    );

    return res.json(await Category.findCategory(category.id));
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      division: Yup.array().of(
        Yup.object().shape({
          user_id: Yup.number().required(),
          percent: Yup.number().required(),
        })
      ),
    });
    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
      return res.status(400).json({ error: 'Dados enviados inválidos.' });
    }
    if (
      req.body.division.reduce(
        (amount, division) => amount + division.percent,
        0
      ) !== 100
    ) {
      return res
        .status(400)
        .json({ error: 'A soma das porcentagens tem que ser igual a 100%' });
    }
    if (await Category.existsCategory(req.body.name, req.params.id)) {
      return res.status(400).json({ error: 'Categoria já existe.' });
    }

    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada.' });
    }
    category.update(req.body);
    await Promise.all(
      await CategoryDivision.findAll({
        where: { category_id: req.params.id },
      }).map(division => division.destroy())
    );
    await Promise.all(
      req.body.division.map(divisionItem => {
        return CategoryDivision.create({
          category_id: category.id,
          ...divisionItem,
        });
      })
    );

    return res.json(await Category.findCategory(category.id));
  }

  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async show(req, res) {
    const categories = await Category.findCategory(req.params.id);
    return res.json(categories);
  }
}

export default new CategoryController();
