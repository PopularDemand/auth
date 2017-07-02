const router = require('express').Router();
const knex = require('../../db/knex');
const moment = require('moment');

router.use((req, res, next) => {
  console.log(`Levels: ${moment()}`);
  next();
});

router.get('/', (req, res) => {
  knex.select().from('levels')
    .then((levels) => {
      res.send(levels);
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