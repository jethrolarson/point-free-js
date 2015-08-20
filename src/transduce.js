const {B, C, K, P} = require('./combinators')
const {ifElse} = require('./logic')
// (a -> b) -> (b -> a -> b) -> (b -> a -> b)
const mapping = B(B)(P)

//:: (a -> Boolean) -> (b -> a -> b) -> b -> a -> b
const filtering = predicate => reducer => acc => it =>
  predicate(it) ? reducer(acc)(it) : acc

module.exports = {mapping, filtering}