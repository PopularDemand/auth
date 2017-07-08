const router = require('express').Router();
const knex = require('../../db/knex');
const moment = require('moment');
const merge = require('lodash/merge');

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
  const levelParams = merge(
    {created_at: moment()},
    req.body
  );

  controller.create(levelParams)
    .then((level) => {
      res.send(level);
    });
});

router.put('/:id', (req, res) => {
  const levelParams = merge(
    {id: req.params.id},
    req.body,
    {updated_at: moment()}
  );

  controller.update(levelParams)
    .then((level) => {
      res.send(level);
    });
});

router.delete('/:id', (req, res) => {
  controller.destroy(req.params.id)
    .then((level) => {
      res.send(level);
    });
});

module.exports = router;
