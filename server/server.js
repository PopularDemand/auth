const express = require('express');
const bodyParser = require('body-parser');
const bkfd2Password = require("pbkdf2-password");
const _ = require('lodash');
const moment = require('moment');

const app = express();
const hasher = bkfd2Password();

const PORT = process.env.PORT || 3000;
const knex = require('../db/knex');

const usersRoutes = require('./routes/users');
const levelsRoutes = require('./routes/levels');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRoutes);
app.use('/levels', levelsRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

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
