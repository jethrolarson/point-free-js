const {B, I, P} = require('./combinators')
const {reduce} = require('./list')
const log = console.log.bind(console)

//:: (b -> c),(a -> b) -> (a -> c)
// Use `B` for curried version
const compose = (f, g) => x => f(g(x))

//:: (a -> b),(b -> c) -> (a -> c)
// Use `P` for curried version
const pipe = (g, f) => x => f(g(x))

const flip = f => (a, b) => f(b, a)

//:: [(a -> b), (b -> c), ...x] -> (a -> x)
const pipeAll = reduce(B)(I)

//:: [x..., (b -> c), (a -> b)] -> (a -> x)
const composeAll = reduce(P)(I)

module.exports = {compose, pipe, flip, pipeAll, composeAll, log}