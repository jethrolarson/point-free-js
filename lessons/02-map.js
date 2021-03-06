var {log} = require('../src/index')

//Supose we have an array of people objects:
var people = require('./people') //Show this ->

//What if we want to get an array of their last names?

// Here is a common way to do that
var getLastNames = function(people){
  var lastNames = []
  for(var i = 0, len = people.length; i < len; i++){
    lastNames.push(people[i].last)
  }
  return lastNames
}

log(getLastNames(people))

// One functional way would be to use map
var getLastNames = (people)=>
  people.map((person)=>
    person.last
  )

// Still works
log(getLastNames(people))

// That's less code but there's a little bit of boilerplate-y duplication here.
// Let's see if we can drop the inner function like we did before.

// First lets isolate the innermost function
var getPersonLastname = (person)=> person.last

// If you look at this at a high level this function doesn't have to care much 
// about what the object is. It just looks for the 'last' prop and returns that.

//So we can genericise this further:
var getLast = (obj) => obj.last

//Now what if we want to make it even more generic?
var prop = (key, obj) => obj[key]

// That hasn't obviously helped our mapping function though sice we still have
// to pass person in...
var getLastNames = (people) =>
  people.map((person) =>
    prop('last', person)
    // There is something else we can do though
  )

// What if prop was a function factory of sorts that returned a generic
// getter function?
var prop = (key) =>
  (obj) => obj[key]

// Then you can use it like this:
var getLast = (person) => prop('last')(person)

// Does this look familiar?

//What if I renamed the variables?
var greet = (name) => hi('last')(name)

// Yes, this is just like our very first example. Which means we can drop
// the inner function!
var getLast = prop('last')

// We can just inline this function in the map since it's so small.
var getLastNames = (people) =>
  people.map(prop('last'))

// Let's do the same to [].map that we did to object.prop
// We want to stop talking about "people" so we'll take the mapping function
// first.
var map = (fn)=>
    // return new function that takes our people
    (ar)=>
        // calls [].map
        ar.map(fn)

var getLastNames = (people) =>
  map(prop('last'))(people)

// Now our map looks just like greet() again!

// Drop the inner function!
var getLastNames = map(prop('last'))

log(getLastNames(people))

// Isn't that cool? we created a useful function from two meta functions and
// some static data ('last') without duplicating anything.

//----

// One pitfall with writing functions this way is that you might get confused
// about what getLastNames actually accepts as arguments and what it returns.

// jsdoc can fill in the gaps, but if you want something more terse you can use
// a type notation that's been adopted from Haskell:

// getLastNames :: [Person] -> [String]
var getLastNames = map(prop('last'))
log(getLastNames(people))
// I.e., getLastNames is a function that takes an array of "Person" objects and returns an
// array of strings. Now I know that 'Person' isn't a proper type, but it can be
// helpful to pretend that it is.

//I tend to drop the part before the :: because it's just the variable name. Again I'm lazy.