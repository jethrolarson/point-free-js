var {getAge} = require('./03-compose')
var {log, map, compose, multiply, reduce, identity} = require('./lib')
var people = require('./people')
var double = multiply(2)
var triple = multiply(3)

// Now suppose you wanted to instead just calculate the ages and augment the
// existing person objects with them. If you were doing this the normal way
// you'd be starting from scratch now, or figuring out some way to refactor.

var includeAges = map((p)=> {
  p.age = getAge(p)
  return p
})

// set
//--------
//lets encapsulate the assignment
//FP purists may want to look away, we're mutating the object
var set = (k) => (v) => (o) => {
  o[k] = v
  return o
}

includeAges = map((person)=>
  set('age')(getAge(person))(person)
)


//We can use compose to squeze it down a little
includeAges = map((person)=>
  compose(
    set('age'),
    getAge
  )(person)(person)
)
//but we hit a weird wall

//It took some time to figure it out what it's called, but what we need here is the W combinator

//:: (a -> a -> b) -> (a -> b)
var W = (fn) => (a) => fn(a)(a)

log(W(multiply)(2))

includeAges = map(W(compose(set('age'), getAge)))

log(includeAges(people))