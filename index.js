require('./app/index') 

// Writing server code using Expressjs
const express = require('express')  
const app = express()  
const port = 3000

app.get('/', (request, response) => {  
  response.send('Hello from Express!')
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

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
// Javascript for cats http://jsforcats.com/#callbacks
// If you have to wait for task A to finish before doing task B, you put all of the code for task B into a function and you only call that function when A is done.

// Async.js https://github.com/caolan/async
// http://caolan.github.io/async/

