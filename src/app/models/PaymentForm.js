import Sequelize, { Model, Op } from 'sequelize';

class PaymentForm extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        expiration_day: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static async existsPaymentForm(name, id = 0) {
    const paymentoForm = await PaymentForm.findOne({
      where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: String(name).toLowerCase(),
      }),
    });
    return paymentoForm
      ? Number(paymentoForm.id) !== Number(id)
      : !!paymentoForm;
  }
}

export default PaymentForm;
