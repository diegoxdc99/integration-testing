var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let contactsRouter = require('./routes/contacts')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter); //rutas para probar la api

// Express Error Handler
app.use((err, req, res, next) => {

  if (err.message.match(/not found/)) { // si el error contiene not found se manda un 404 con el error
    return res.status(404).send({ error: err.message })
  }

  if (err.name == "UnauthorizedError" || err.message.match(/Not authorized/)) { // si es una excepción con respecto a la autorización
    return res.status(401).send({error: err.message})
  }

  res.status(500).send({ error: err.message }) //error desconocido
})


module.exports = app;
