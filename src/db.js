const pg = require('pg');
const dbConfig = require('../config/db');

const pool = new pg.Pool(dbConfig);

pool.on('error', (err, client) => {
  console.error('error: '. err.message, err.stack);
});

const makeQuery = function(text, values, cb) {
  return pool.query(text, values, cb);
};

const createUser = function(columns, values, cb) {
  const valueStr = _build$Str(values.length);
  const text = `INSERT INTO users(${columns.join(', ')}) VALUES(${valuesStr}) RETURNING *`;
  
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

const deleteUser = function(params, cb) {
  const text = `DELETE from users WHERE id = ${id} RETURNING *`;

  return makeQuery(text, [params.id], cb);
};

_parseParams = (params) => {
  const columns = Object.keys(params);
  const values = columns.map((col) => params[col]);

  return [columns, values];
};

_build$Str = (num) {
  return '$' + range(1, num+1).join(', $');
}

module.exports = {
  createUser,
  findUser,
  deleteUser,
  makeQuery,
  pool
}