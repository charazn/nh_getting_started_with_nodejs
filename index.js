'use strict'
require('./app/index')

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
// const port = 3000
const app = express()
app.set('port', (process.env.PORT || 5000)) // From Getting Started on Heroku with Node.js

const fs = require('fs')
const pg = require('pg')
// const conString = 'postgres://@localhost/node_hero'
const bodyParser = require('body-parser') 

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  response.render('home', {
    name: 'John'
  })
})

app.post('/users', function (req, res, next) {
  // var user = req.body
  var user = req.query // Alternative to using req.body, just enter ?name=myname&age=number in the url, but must still use Postman to make the POST request
  console.log(user) 

  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done()

      if (err) {
        return next(err)
      }

      res.send(user.name + ' ' + user.age)
      // res.sendStatus(200)
    })
  })
})

app.get('/users', function (req, res, next) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done()

      if (err) {
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

app.listen(app.get('port'), function (err) { // From Getting Started on Heroku with Node.js
  if (err) throw err // I added in the err
  console.log('Node app is running on port', app.get('port'))
})
