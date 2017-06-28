const pg = require('pg');
const dbConfig = require('../config/db');

const pool = new pg.Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('error: '. err.message, err.stack);
});

const makeQuery = function(text, values, cb) {
  return pool.query(text, values, cb);
};

const createUser = function(fields, values, cb) {
  let count = 1;
  const valuesStr = '$' + values.map(() => count++).join(', $');
  const text = `INSERT INTO users(${fields.join(', ')}) VALUES(${valuesStr}) RETURNING *`;
  
  return makeQuery(text, values, cb)
    .catch((e) => console.error(e));
};

const findUser = function(params, cb) {
  // TODO: can make params be multi keyed
  const columns = Object.keys(params);
  const values = columns.map((col) => params[col]).slice(0, 1);

  const text = `SELECT * from users WHERE ${columns[0]} = $1 LIMIT 1`;

  return makeQuery(text, values, cb); // TODO: standardize where errors caught
};

module.exports = {
  createUser,
  findUser,
  makeQuery,
  pool
}