var R = require('ramda')
var l = console.log.bind(console)
var lesson3 = require('./03-compose')
var getAge = lesson3.getAge
var getAges = lesson3.getAges

// Get people ages multiplied by 2

//Start with naive FP approach
var getDoubledAges = (people)=> {
  var ages = getAges(people)
  R.map(function(age){
    return age * 2
  })(ages)
}
// in the innermost function you can see there's only one operation, so lets
// create a function that can do it.

var multiply = (a)=> (b) => a * b

// Maybe you're tired of writing functions this way. It's not as clean as:
var multiply = (a, b) => a * b
// and who wants to have to call functions in butt format: multiply(1)(2)

// Fortunately a number of libraries are popping up now with auto-curry.
// My favorite of which is Ramda.
var R = require('ramda')

// This flavor of curry(Kyurie) takes a function and returns one that will call the
// passed function once it has all its arguments. The implementation is a
// little complex to step through the way I've done with other functions so
// you'll have to take this on faith.

var multiply = R.curry(multiply)

// Now these are the same.
l(multiply(2)(3) === multiply(2, 3))

//Back to our original challenge, we're doubling some ages.
var getDoubledAges = (people)=>
  R.map(multiply(2))(getAges(people))

//To eliminate "people" we have to unnest the functions using compose
var getDoubledAges = (people)=>
  R.compose(
    R.map(multiply(2)),
    getAges
  )(people)

// kill the inner function!
var getDoubledAges = R.compose(
  R.map(multiply(2)),
  getAges
)

// Nice!
// You may notice that this loops over people twice.

// There's an simple law associated with map and compose that can help us out:
// compose(map(f) . map(g)) == map(compose(f . g))

// Since we've been building reusable functions this whole time we can refactor
// this super easilly.

// [Person] -> [Number]
var getDoubledAges = R.map(
  R.compose(multiply(2), getAge)
)

var people = require('./people')
l(getDoubledAges(people))
// Double nice!

// Get people over 60
var getPeopleOver60 = R.filter((person)=>
  getAge(person) > 60
)

var gt = R.curry((a, b)=> a > b)

var getPeopleOver60 = R.filter((person)=>
  gt(getAge(person), 60)
)

var getPeopleOver60 = R.filter((person)=>
  R.compose(R.flip(gt)(60), getAge)(person)
)

// [Person] -> [Person]
var getPeopleOver60 = R.filter(R.compose(R.flip(R.gt)(60), getAge))

//can't see everyone in the terminal so just give me the first names
l(R.map(R.prop('first'), getPeopleOver60(people)))

//sort by dob
var toTime = (dateStr)=>
  new Date(dateStr).getTime()

l(R.sortBy(R.compose(toTime, R.prop('dob')), people))

//sort by age ascending
l(R.sortBy(R.compose(R.negate, toTime, R.prop('dob')), people))

//split people over 60 into two lists
//can just copy to do easy refactoring
var isOver60 = R.compose(R.gt(R.__, 60), getAge)
l(R.partition(isOver60, people))

//give me the two oldest people
R.compose(
  l,
  R.take(2),
  R.sort(R.compose(toTime, R.prop('dob')))
)(people)