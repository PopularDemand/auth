const express = require('express');
const bodyParser = require('body-parser');
const bkfd2Password = require("pbkdf2-password");
const _ = require('lodash');
const moment = require('moment');

const app = express();
const hasher = bkfd2Password();

const PORT = process.env.PORT || 3000;
// const db = require('./db');
const knex = require('../db/knex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users', (req, res) => {
  knex.select().from('users')
    .then((users) => {
      res.send(users);
    });
});

app.get('/users/:id', (req, res) => {
  knex.select().from('users').where('id', req.params.id)
    .then((user) => {
      res.send(user);
    });
});

app.get('/users/:id/level', (req, res) => {
  knex
    .select('users.*', 'levels.name as level_name')
    .from('users')
    .innerJoin('levels', 'users.level_id', 'levels.id')
    .where('users.id', req.params.id)
    .then((data) => {
      res.send(data);
    });
})

app.get('/levels', (req, res) => {
  knex.select().from('levels')
    .then((levels) => {
      res.send(levels);
    });
});

app.post('/levels', (req, res) => {
  knex('levels')
    .insert(req.body.level)
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

app.put('/levels/:id', (req, res) => {
  const levelParams = _.merge({}, req.body.level, {updated_at: moment()});
  knex('levels')
    .where('id', req.params.id)
    .update(levelParams)
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

app.delete('/levels/:id', (req, res) => {
  knex('levels')
    .where('id', req.params.id)
    .del()
    .returning(['id', 'name'])
    .then((level) => {
      res.send(level);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// knex.raw('select * from users')

// app.post('/registration', (req, res) => {
//   const user = _.merge({}, req.body);

//   hasher(_.pick(user, 'password'), (err, password, salt, hash) => {
//     user.encrypted_password = hash;
//     user.salt = salt;
//     delete user['password'];

//     const fields = Object.keys(user);
//     const values = fields.map((field) => user[field]);

//     db.createUser(fields, values)
//       .then((user) => {
//         console.log(user); // todo check return value - db res or user obj
//         res.send(JSON.stringify(user));
//       });
//   });
// });

// app.post('/login', (req, res) => {
//   const userParams = _.merge({}, req.body);
//   db.findUser(userParams)
//     .then((data) => {
//       const user = data.rows[0];
//       hasher(_.merge(_.pick(userParams, 'password'), _.pick(user, 'salt')),
//         (err, password, salt, hash) => {
//           if(user.encrypted_password === hash) {
//             res.send(user);
//           } else {
//             res.send('User not found'); // TODO: more desciptive error
//           }
//         })
//     })
//     .catch((e) => {
//       res.send(e.message);
//     });
// });