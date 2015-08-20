const {C, I} = require('./combinators')

//:: a -> b -> Boolean
const eq = a => b => a === b

const ifElse = pred => f => g => x => pred(x) ? f(x) : g(x)

const unless = pred => ifElse(pred)(I)

const when = pred => C(ifElse(pred))(I)

const and = a => b => a && b

const or = a => b => a || b

const not = a => !a

const complement = f => a => !f(a)

module.exports = {eq, ifElse, unless, when, and, or, not, complement}