const pg = require('pg');
const dbConfig = require('../config/db');

const pool = new pg.Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('error: '. err.message, err.stack);
});

const makeQuery = function(text, values, cb) {
  console.log('query: ', text, values);
  return pool.query(text, values, cb);
};

const createUser = function(fields, values, cb) {
  const text = `INSERT INTO users(${fields.join(', ')}) VALUES($1, $2) RETURNING *`;
  
  return makeQuery(text, values, cb)
    .catch((e) => console.error(e));
};

// const text = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
// const values = ['username', 'pass'];

// makeQuery(text, values)
//   .then((res) => console.log(res))
//   .catch((e) => console.error(e));

module.exports = {
  makeQuery,
  createUser,
  pool
}