import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'display_color'],
    });
    return res.json(users);
  }
}

export default new UserController();
