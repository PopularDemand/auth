const router = require('express').Router();
const knex = require('../../db/knex');
const moment = require('moment');

const LevelsController = require('../controllers/LevelsController');
const controller = new LevelsController();

router.use((req, res, next) => {
  console.log(`Levels: ${moment()}`);
  next();
});

router.get('/', (req, res) => {
  controller.index()
    .then((levels) => {
      res.send(levels);
    });
});

router.get('/:id', (req, res) => {
  controller.show(req.params.id)
    .then((level) => {
      res.send(level);
    });
});

router.post('/', (req, res) => {
  knex('levels')
    .insert(req.body.level)
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

router.put('/:id', (req, res) => {
  const levelParams = _.merge({}, req.body.level, {updated_at: moment()});
  knex('levels')
    .where('id', req.params.id)
    .update(levelParams)
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

router.delete('/:id', (req, res) => {
  knex('levels')
    .where('id', req.params.id)
    .del()
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

module.exports = router;