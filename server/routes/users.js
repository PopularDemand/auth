const router = require('express').Router();
const knex = require('../../db/knex');
const moment = require('moment');

router.use((req, res, next) => {
  console.log(`Users: ${moment()}`);
  next();
});

router.get('/', (req, res) => {
  knex.select().from('users')
    .then((users) => {
      res.send(users);
    });
});

router.get('/:id', (req, res) => {
  knex.select().from('users').where('id', req.params.id)
    .then((user) => {
      res.send(user);
    });
});

router.get('/:id/level', (req, res) => {
  knex
    .select('users.*', 'levels.name as level_name')
    .from('users')
    .innerJoin('levels', 'users.level_id', 'levels.id')
    .where('users.id', req.params.id)
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
