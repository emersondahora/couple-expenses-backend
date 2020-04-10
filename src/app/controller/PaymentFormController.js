import * as Yup from 'yup';

import PaymentForm from '../models/PaymentForm';
import Expense from '../models/Expense';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      expiration_day: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    if (await PaymentForm.existsPaymentForm(req.body.name)) {
      return res.status(400).json({ error: 'Forma de pagamento já existe.' });
    }

    const paymant = await PaymentForm.create(req.body);

    return res.json(paymant);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      expiration_day: Yup.number(),
    });
    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
      return res.status(400).json({ error: 'Dados enviados inválidos.' });
    }

    if (await PaymentForm.existsPaymentForm(req.body.name, req.params.id)) {
      return res.status(400).json({ error: 'Forma de pagamento já existe.' });
    }

    const paymentForm = await PaymentForm.findByPk(req.params.id);
    if (!paymentForm) {
      return res
        .status(400)
        .json({ error: 'Forma de pagamento não encontrada.' });
    }
    paymentForm.update(req.body);
    return res.json(paymentForm);
  }

  async index(req, res) {
    const paymentForms = await PaymentForm.findAll();
    return res.json(paymentForms);
  }

  async show(req, res) {
    const paymentForm = await PaymentForm.findByPk(req.params.id);
    if (!paymentForm) {
      return res
        .status(400)
        .json({ error: 'Forma de pagamento não encontrada.' });
    }
    return res.json(paymentForm);
  }

  async delete(req, res) {
    const paymentForm = await PaymentForm.findByPk(req.params.id);
    if (!paymentForm) {
      return res
        .status(400)
        .json({ error: 'Forma de pagamento não encontrada.' });
    }
    const existsPaymentExpenses = await Expense.count({
      where: { payment_form_id: paymentForm.id },
      limit: 1,
    });
    if (existsPaymentExpenses) {
      return res.status(400).json({
        error:
          'Forma de pagamento não pode ser apagada, já possui despesa cadastrada para ela.',
      });
    }
    await paymentForm.destroy();
    return res.status(200).json(existsPaymentExpenses);
  }
}

export default new CategoryController();
