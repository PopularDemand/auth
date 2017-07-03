const BaseController = require('./BaseController');
const Level = require('../models/level');

class LevelsController extends BaseController {
  constructor() {
    super('levels', Level);
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

  delete(id) {
    return super.delete(id);
  }
}

module.exports = LevelsController;
