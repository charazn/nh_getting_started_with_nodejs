// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode
// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
'use strict'
require('./app/index')

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
// const users = [] // Storing users in memory
const fs = require('fs')
const pg = require('pg')
const conString = 'postgres://@localhost/node_hero' // make sure to match your own database's credentials
const bodyParser = require('body-parser') // To be able to read req.body in POST request
// http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters

app.use(bodyParser.json()) // seems to follow sequence use, set, engine???
app.use(bodyParser.urlencoded({ extended: true })) // This must be enabled for x-www-form-urlencoded to work in body

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

// Storing users in memory
// app.post('/users', function (req, res) {  
//   // retrieve user posted data from the body
//   const user = req.body
//   users.push({
//     name: user.name,
//     age: user.age
//   })
//   res.send('successfully registered')
// })

// Storing users in a file using fs
// app.post('/users', function (req, res) {
//   const user = req.body
//   fs.appendFile('users.txt', JSON.stringify({ name: user.name, age: user.age }), (err) => {
//     res.send('successfully registered')
//   })
// })

// Storing users in a postgresql database
// Use ExpressJS to Get URL and POST Parameters https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.post('/users', function (req, res, next) {
  // var name = req.body.name
  // var age = req.body.age
  var user = req.body
  console.log(user) // Returns a json object

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.send(user.name + ' ' + user.age)
      // res.sendStatus(200)
    })
  })
})

app.get('/users', function (req, res, next) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

console.log('Browser listening on port 3000....')
app.listen(port)


// Writing server code using Expressjs
// const express = require('express')  
// const app = express()  
// const port = 3000

// app.get('/', (request, response) => {  
//   response.send('Hello from Express!')
// })
// // The biggest difference what you have to notice here is that Express by default gives you a router. You don't have to check manually for the URL to decide what to do, but instead, you define the application's routing with app.get, app.post, app.put, etc. They are translated to the corresponding HTTP verbs.

// app.listen(port, (err) => {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })

// Writing server code with Nodejs
// const http = require('http')  
// const port = 3000

// const requestHandler = (request, response) => {  
//   console.log(request.url)
//   response.end('Hello Node.js Server!')
// }

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })

// Notes for Chapter 3 Asynchronous Programming in Nodejs

// Asynchronous programming can only be achieved with functions being first- class citizens of the language: they can be passed around like any other variables to other functions.
// Functions that can take other functions as arguments are called higher- order functions.
// If you pass a function to another function as a parameter, you can call it within the function when you are finished with your job. 
// No need to return values, only calling another function with the values.
// These so-called error-first callbacks are in the heart of Node.js itself.

// Things to notice here:
// error-handling: instead of a try-catch block you have to check for errors in the callback
// no return value: async functions don't return values, but values will be passed to the callbacks

// The Event Loop

// The event loop is in the heart of Node.js / Javascript - it is responsible for scheduling asynchronous operations.
// Event-driven programming is a programming paradigm in which the flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other programs/threads.

// Callback hell http://callbackhell.com/
// The Art of Node https://github.com/maxogden/art-of-node
// Browserify-handbook https://github.com/substack/browserify-handbook

// Eloquent JavaScript http://eloquentjavascript.net/
// Let's Write Code https://github.com/shama/letswritecode, https://www.youtube.com/user/kylerobinsonyoung
// Javascript for cats http://jsforcats.com/#callbacks
// If you have to wait for task A to finish before doing task B, you put all of the code for task B into a function and you only call that function when A is done.

// Async.js https://github.com/caolan/async
// http://caolan.github.io/async/

// JavaScript Let
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types
