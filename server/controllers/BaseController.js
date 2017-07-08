const moment = require('moment');

const knex = require('../../db/knex');

class BaseController {
  constructor(table, model) {
    this.table = table;
    this.model = model;
    this.badInitialization = !(table && model);
  }

  beforeEach() {
    this._checkInitialization();
  }

  index() {
    this.beforeEach();

    return this.model.fetchAll();
  }

  show(id) {
    this.beforeEach();

    return this.model
      .forge({id: id})
      .fetch()
      .then((resource) => resource);
  }

  create(params) {
    this.beforeEach();

    return this.model
      .forge(params)
      .save()
      .then((resource) => resource);
  }

  update(params) {
    this.beforeEach();

    return new this.model(params)
      .save(params, {patch: true})
      .then((resource) => resource);
  }

  destroy(id) {
    return new this.model({id: id})
      .destroy()
      .then((resource) => resource);
  }

  _checkInitialization() {
    if (this.badInitialization) {
      throw new Error(`improper initialization: ${this.table}, ${this.model}`);
    }
  }
}

module.exports = BaseController;
