const moment = require('moment');

const knex = require('../../db/knex');

class BaseController {
  constructor(table, model) {
    this.table = table;
    this.model = model;
    this.badInitialization = !(table && model);
  }

  index() {
    if (this.badInitialization) {
      throw new Error(`improper initialization: ${this.table}, ${this.model}`);
    }

    return this.model.fetchAll();
  }

  show(id) {
    if (this.badInitialization) {
      throw new Error(`improper initialization: ${this.table}, ${this.model}`);
    }

    return this.model
      .forge({id: id})
      .fetch()
      .then((resource) => resource);
  }

  create(params) {
    // knex insert
    if (this.badInitialization) {
      throw new Error(`improper initialization: ${this.table}, ${this.model}`);
    }

    return this.model
      .forge(params)
      .save()
      .then((resource) => resource);
  }

  update(params) {
    // knex update
  }

  delete(id) {
    // knex delete
  }
}

module.exports = BaseController;