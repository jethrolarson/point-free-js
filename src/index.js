// Obviously you'd want some unit tests behind this stuff, but I'm lazy. 
// Do I really need a test to confirm that `(a) => a` works?

//:: (a -> b -> c) -> (b -> a -> c)
const log = console.log.bind(console)

const flip = (fn) =>
  (...args) =>
    fn(...args.reverse())

//:: a -> a
const identity = (x) => x

//:: (a -> b) -> [a] -> [b]
const map = (fn)=>
    // return new function that takes our people
    (ar)=>
        // calls [].map
        ar.map(fn)

//:: String -> {} -> a
const prop = (key) =>
  (obj) => obj[key]

//:: (b -> c) -> (a -> b) -> (a -> c)
const compose = (f, g) => (x) => f(g(x))

//:: String -> a -> Object
const set = (k) => (v) => (o) => {
  o[k] = v
  return o
}

//:: a -> b -> c
const add = (a) => (b) => a + b

//:: a -> b -> c
const multiply = (a) => (b) => a * b



//:: (a -> Boolean) -> [a] -> [a]
const filter = (pred) => (list) => list.filter(pred)

//:: (b -> a -> b) -> b -> [a] -> b
const reduce = (fn) => (acc) => (list) => list.reduce((acc, it)=> fn(acc)(it), acc)

//:: [(a -> b), (b -> c), ...x] -> (a -> x)
const pipe = reduce(compose)(identity)

//:: a -> b -> Boolean
const eq = (a) => (b) => a === b

//:: String -> a -> (Object -> Boolean)
const propEq = (key, val) => (o) => o[key] === val

const ifElse = (pred, fn1, fn2) =>
    (x) => pred(x) ? fn1(x) : fn2(x)

const {U,B,K,W,C,I,Y,P} = require('./combinators')
module.exports = {log, flip, identity, map, prop, compose, pipe, add, set,
  multiply, reduce, eq,  propEq, ifElse, U, B, K, W, C, I, Y, P}