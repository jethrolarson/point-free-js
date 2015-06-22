var people = require('./people');
var R = require('ramda');
var map = R.map;
var prop = R.prop;
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

console.log(getAges(people));
// It works fine, but it's not easy to reuse or edit.

// Lets see how we'd do that more functionally

// Create a function to get age from a date string.
// We could dig into making this function point-free, but since it's primarilly
// fiddling with the impure Date object it might not be as fruitful as our
// other oportunities.
var calculateAge = function(birthday) {
  var nowMS = Date.now();
  var birthdayMS = new Date(birthday).getTime();
  var ageMS = nowMS - birthdayMS;
  return Math.abs(new Date(ageMS).getUTCFullYear() - 1970);
};


var getAges = map(function(person) {
  var dob = prop('dob')(person);
  return calculateAge(dob);
});

console.log(getAges(people));

// We couldn't drop `person` because we have to pass the result of `prop('dob')`
// to calculateAge. To ditch it we need a way to join `prop('dob')` and
// calculateAge so that we can pipe arbitrary objects into them.

// Compose
//----------
// Compose takes two functions
var compose = function(f, g) {
  // and returns a new one
  return function(x) {
    // that calls them with it's arguments
    return f(g(x));
  };
};
// i.e. compose(f, g)(1) == f(g(1));

// So lets use compose on our getAge
var getAge = function(person){
  return compose(calculateAge, prop('dob'))(person);
};

// That puts `person` in the final call position so...


//Drop the inner function!
var getAge = compose(
  calculateAge,
  prop('dob')
);

// getAges :: [Person] -> [Number]
var getAges = map(getAge);

console.log(getAges(people));
//still get the same answer

//We're going to use these functions later so I'll export them here
module.exports = {
  getAge: getAge,
  getAges: getAges
};
