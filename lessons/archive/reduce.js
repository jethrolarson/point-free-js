//This part got too arcane and involved. Plus I needed to cut for time.
var {log, multiply, add, set, compose, propEq, ifElse, identity} = require('../../src/index')
var {getAges, getAge} = require('../03-compose')
var people = require('../people')

// Lets try to sum the ages of our people.

//:: (b -> a -> b) -> b -> [a] -> b
var reduce = (fn) => (acc) => (list) => list.reduce((acc, it)=> fn(acc)(it), acc)

var sum = reduce(add)(0);
var product = reduce(multiply)(1);

log(sum(getAges(people)))

// You can actually implement map and filter via reduce

var map = (fn) => (list) =>
    reduce((acc) => (it) => acc.concat([fn(it)])) ([]) (list)

//oh hey, list is in final position, so we can drop

var map = (fn) =>
    reduce((acc) => (it) => acc.concat([fn(it)])) ([])

//capture array concat in a new function
var appendTo = (arr) => (item) => arr.concat([item])

var map = (fn) =>
    reduce((acc) => (it) => appendTo(acc)(fn(it))) ([])

//compose
var map = (fn) =>
    reduce((acc) => (it) => compose(appendTo(acc), fn)(it)) ([])

//eliminate `it`
var map = (fn) =>
    reduce((acc) => compose(appendTo(acc), fn)) ([])

//eh, that's good enough for me

var filter = (pred) => (list) =>
    reduce((acc) => (it) => pred(it) ? appendTo(acc)(it) : acc) ([]) (list)
    
// use ifElse and always a.k.a const
var always = (a) => (b) => a

var filter = (pred) =>
    reduce((acc) => (it) => ifElse(pred, appendTo(acc), always(acc))(it)) ([])

//elmininate `it`
var filter = (pred) =>
    reduce((acc) => ifElse(pred, appendTo(acc), always(acc))) ([])

// pretty neat eh?

log(filter(propEq('prefix', 'Prof.'))(people))

// I didn't eliminate all the arguements in above because it can get tricky 
// when functions have multiple arguments.
// If you want to go there, we can go there though.

// Who wants to go too far?

//first thing we'll want to do is make compose and pipe curried.
var compose = f => g => x => f(g(x))
var pipe = g => f => x => f(g(x))
// that way we can partially apply them with each other. It's gonna get weird.

var map = (fn) =>
    reduce((acc) => compose(appendTo(acc))(fn)) ([])

var map = (fn) =>
    reduce((acc) => pipe(fn)(appendTo(acc))) ([])

var map = (fn) =>
    reduce((acc) => compose(pipe(fn))(appendTo)(acc)) ([])

var map = (fn) =>
    reduce(compose(pipe(fn))(appendTo)) ([])
    
var map = (fn) =>
    reduce(compose(pipe(appendTo))(pipe)(fn)) ([])

var map = (fn) =>
    compose(reduce)(compose(pipe(appendTo))(pipe)) (fn) ([])

//need to curry flip
var flip = (fn) => (a) => (b) => fn(b)(a)

var map = (fn) =>
    flip(compose(reduce)(compose(pipe(appendTo))(pipe))) ([]) (fn)

var map = flip(compose(reduce)(compose(pipe(appendTo))(pipe))) ([])

// Optionally swap compose for pipe
var map = flip(pipe(pipe(pipe)(pipe(appendTo)))(reduce)) ([])