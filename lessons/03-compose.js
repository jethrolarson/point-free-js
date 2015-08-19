var people = require('./people')

// Including a library that'll give us our helpers from before
var {log, map, prop} = require('../src/index')

//What if we want to get a list of their ages?

//You probably used to seeing code like this
function getAges(ar){
  var out = [];
  var nowMS = new Date().getTime();
  var ageMS = 0;
  var birthdayMS = 0;
  for(var i = 0, len = ar.length; i < len; i++){
    birthdayMS = new Date(ar[i].dob).getTime();
    ageMS = nowMS - birthdayMS;
    out.push(Math.abs(new Date(ageMS).getUTCFullYear() - 1970));
  }
  return out;
}
// Glancing at this it's hard to tell what is date logic and what is
// dealing with the iteration.

log(getAges(people))
// It works fine, but it's not easy to reuse or edit.

// Lets see how we'd do that more functionally

// Create a function to get age from a date string.
// We could dig into making this function point-free, but since it's primarilly
// fiddling with the impure Date object it might not be as fruitful as our
// other oportunities.
const calculateAge = (birthday) => {
  var nowMS = Date.now()
  var birthdayMS = new Date(birthday).getTime()
  var ageMS = nowMS - birthdayMS
  return Math.abs(new Date(ageMS).getUTCFullYear() - 1970)
}

var getAges = map((person) => {
  var dob = prop('dob')(person)
  return calculateAge(dob)
})

log(getAges(people))

// We couldn't drop `person` because we have to pass the result of `prop('dob')`
// to calculateAge. To ditch it we need a way to join `prop('dob')` and
// calculateAge so that we can pipe arbitrary objects into them.

// Compose
//----------
// Compose takes two functions
var compose = (f, g) =>
  // and returns a new one
  (x) =>
    // that calls them with it's argument
    f(g(x))

// i.e. compose(f, g)(1) == f(g(1))

// So lets use compose on our getAge
var getAge = (person)=>
  compose(calculateAge, prop('dob'))(person)

// That puts `person` in the final call position so...


//Drop the inner function!
var getAge = compose(
  calculateAge,
  prop('dob')
)

// getAges :: [Person] -> [Number]
var getAges = map(getAge)

log(getAges(people))
//still get the same answer


// Get people ages multiplied by 2

//Rather than starting with a loop we'll start with naive FP approach
var getDoubledAges = (people) => {
  var ages = getAges(people)
  return map(function(age){
    return age * 2
  })(ages)
}

// in the innermost function you can see there's only one operation, so lets
// create a function that can do it.

var multiply = (a)=> (b) => a * b

// I know if can get a little confusing looking at the double arrows so I'll
// break this one apart so it's fresh in your mind
var multiply = function(a){
  return function(b){
    return a * b
  }
}
//So again, to multiply two values with this function you have to call it like:
multiply(2)(3)

//This is cool because you can make other functions out of it as needed
var double = multiply(2)
var quad = multiply(4)
var half = multiply(0.5)

// As an aside, writing subtraction or division in terms of add or multiply
// means that you don't have to care about the order of the arguments. This
// leads to fewer errors in my experience.

var getDoubledAges = (people)=>
  map(double)(getAges(people))

//To eliminate "people" we have to unnest the functions using compose
var getDoubledAges = (people)=>
  compose(
    map(double),
    getAges
  )(people)

// kill the inner function!
var getDoubledAges = compose(
  map(double),
  getAges
)

// Nice!
// You may notice that this loops over people twice.

// There's an simple mathematical law associated with map and compose that can help us out:
// compose(map(f), map(g)) == map(compose(f, g))

// Since we've been building reusable functions this whole time we can refactor
// this super easilly.

// [Person] -> [Number]
var getDoubledAges = map(
  compose(multiply(2), getAge)
)

var people = require('./people')
log(getDoubledAges(people))

// Double nice!

//We're going to use these functions later so I'll export them here
module.exports = {
  getAge: getAge,
  getAges: getAges
}
