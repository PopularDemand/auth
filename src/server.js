const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/registration', (req, res) => {
  const fields = Object.keys(req.body);
  const values = fields.map((field) => req.body[field]);

  db.createUser(fields, values)
    .then((user) => console.log(user));
});

app.listen(3000);
