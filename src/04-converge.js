var {getAge} = require('./03-compose')
var R = require('ramda')

// Now suppose you wanted to instead just calculate the ages and augment the
// existing person objects with them. If you were doing this the normal way
// you'd be starting from scratch now, or figuring out some way to refactor.

var includeAges = R.map((p)=> {
  p.age = getAge(p)
  p
})

// set
//--------
//lets encapsulate the assignment
//FP purists may want to look away, we're mutating the object
var set = (k)=>
  (v, o)=> {
    o[k] = v
    return o
  }

includeAges = R.map((person)=>
  set('age')(getAge(person), person)
)
// Now we have both arguments of `set` getting `person`, though one is transformed
// by getAge. To drop person we'll need a function that can split one argument
// into 2 and transform them.

// Converge
// ----------
var converge = (final, transform1, transform2) =>
  (x)=> final(transform1(x), transform2(x))

// converge(baz, foo, bar)(x) === baz(foo(x), bar(x))
// Basically it splits our argument into 2 by applying it to separate
// transform functions, then passing those results to the first function

/*
includeAges = map((person) {
  return converge(set('age'), getAge, person?))
}
*/

// Hm, p isn't a function
// We need a function that does nothing. That seems like a dumb thing to
// need but w/e.
var identity =  (a) => a

includeAges = R.map((person)=>
    converge(set('age'), getAge, identity)(person)
)

//:: [Person] -> [Person]
includeAges = R.map(converge(set('age'), getAge, identity))

//Waited till last moment to require the people, cuz why not?
console.log(includeAges(require('./people')))