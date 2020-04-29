import * as Yup from 'yup';
import { startOfMonth, addMonths, parseISO, toDate } from 'date-fns';

import Expense from '../models/Expense';
import ExpenseDivision from '../models/ExpenseDivision';
import User from '../models/User';
import Category from '../models/Category';
import PaymentForm from '../models/PaymentForm';

class ExpenseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      expense_date: Yup.date().required(),
      month: Yup.date().required(),
      installment_total: Yup.number().required(),
      amount: Yup.number().required(),
      user_id: Yup.number().required(),
      category_id: Yup.number().required(),
      payment_form_id: Yup.number().required(),
      division: Yup.array()
        .of(
          Yup.object().shape({
            user_id: Yup.number().required(),
            amount: Yup.number().required(),
          })
        )
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    const amountDivision = req.body.division.reduce(
      (amount, division) => amount + division.amount,
      0
    );

    if (amountDivision !== req.body.amount) {
      return res.status(400).json({
        error: 'A soma da divisão tem que ser igual ao total da despesa',
      });
    }

    const expense_base = {
      ...req.body,
      installment_current: 1,
      month: startOfMonth(parseISO(req.body.month)),
      expense_date: parseISO(req.body.expense_date),
    };
    delete expense_base.division;

    const expense = await Expense.create(expense_base, req.body.division);
    expense_base.expense_original = expense.id;

    const expenses = [];
    if (req.body.installment_total > 1) {
      for (
        let installment_current = 2;
        installment_current <= req.body.installment_total;
        installment_current += 1
      ) {
        expenses.push(
          Expense.create(
            {
              ...expense_base,
              installment_current,
              month: addMonths(expense_base.month, installment_current - 1),
            },
            req.body.division
          )
        );
      }
      const response = await Promise.all(expenses);
      return res.json([expense, ...response]);
    }
    return res.json([expense]);
  }

  async index(req, res) {
    const month = req.query.month
      ? startOfMonth(parseISO(req.query.month))
      : startOfMonth(new Date());
    const expenses = await Expense.findAll({
      where: { month },
      include: [
        {
          model: ExpenseDivision,
          as: 'divisions',
          attributes: ['user_id', 'amount'],
        },
        { model: User, attributes: ['name', 'display_color'], as: 'user' },
        { model: Category, attributes: ['name'], as: 'category' },
        { model: PaymentForm, attributes: ['name'], as: 'paymentform' },
      ],
    });
    return res.json(expenses);
  }
}

export default new ExpenseController();
