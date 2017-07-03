const DB = require('../../db/bookshelf');

const Level = DB.model('Level', {
  tableName: 'levels',
  collection: DB.Collection.extend({model: this}),
  users: function() {
    return this.hasMany('User');
  }
});

module.exports = Level;
