const calc = require('./calc')

const numbersToAdd = [  
  3,
  4,
  10,
  2
]

const result = calc.sum(numbersToAdd)  
console.log(`The result is: ${result}`)
// Notice the backticks `, Template literals are string literals allowing embedded expressions.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals 