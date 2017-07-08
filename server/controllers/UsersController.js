const BaseController = require('./BaseController');
const User = require('../models/user');

class UsersController extends BaseController {
  constructor() {
    super('users', User);
  }

  index() {
    return super.index();
  }

  show(id) {
    return super.show(id);
  }

  create(params) {
    return super.create(params);
  }

  update(params) {
    return super.update(params);
  }

  destroy(id) {
    return super.destroy(id);
  }
}

module.exports = UsersController;
