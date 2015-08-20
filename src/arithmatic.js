//:: Number -> Number -> Number
const add = a => b => a + b

//:: Number -> Number -> Number
const multiply = a => b => a * b

//Note Divide and subtract should be done using multiply(0.5) or add(-2).

//note that this takes exponent first
//:: Number -> Number -> Number
const pow = exponent => base => Math.pow(base, exponent)

const modulo = a => b => a % b
module.exports = {add, multiply, pow, modulo}