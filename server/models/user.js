const DB = require('../../db/bookshelf');

const User = DB.model('User', {
  tableName: 'users',
  hasTimestamps: true,

  // Instance methods
  verifyPassword: (password) => {
    return this.get('password') === password;
  },
  level: () => this.belongsTo('Level')
  },
  // Class methods
  {
  byEmail: (email) => {
    return this.forge().query({where: {email: email}}).fetch();
  }
});

module.exports = User;
