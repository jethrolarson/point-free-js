R = require('ramda');
var lesson3 = require('./03-compose');
var getAge = lesson3.getAge;
var getAges = lesson3.getAges;

// Get people ages multiplied by 2

//Start with naive FP approach
var getDoubledAges = function(people){
  var ages = getAges(people);
  R.map(function(age){
    return age * 2;
  })(ages);
};
// in the innermost function you can see there's only one operation, so lets
// create a function that can do it.

var multiply = function(a){
  return function(b){
    return a * b;
  };
};

// Maybe you're tired of writing functions this way. It's not as clean as:
var multiply = function(a, b){
  return a * b;
};
// and who wants to have to call functions in butt format: multiply(1)(2)

// Fortunately a number of libraries are popping up now with auto-curry.
// My favorite of which is Ramda.
var R = require('ramda');

// This flavor of curry(Kyurie) takes a function and returns one that will call the
// passed function once it has all its arguments. The implementation is a
// little complex to step through the way I've done with other functions so
// you'll have to take this on faith.

var multiply = R.curry(multiply);

// Now these are the same.
console.log(multiply(2)(3) === multiply(2, 3));

//Back to our original challenge, we're doubling some ages.
var getDoubledAges = function(people){
  return R.map(multiply(2))(getAges(people));
};

//To eliminate "people" we have to unnest the functions using compose
var getDoubledAges = function(people){
  return R.compose(
    R.map(multiply(2)),
    getAges
  )(people);
};

// kill the inner function!
var getDoubledAges = R.compose(
  R.map(multiply(2)),
  getAges
);

// Nice!
// You may notice that this loops over people twice.
// Since we've been building reusable functions this whole time we can refactor
// this super easilly.

// [Person] -> [Number]
var getDoubledAges = R.map(
  R.compose(multiply(2), getAge)
);
var people = require('./people');
console.log(getDoubledAges(people));
// Double nice!

// With the power of R.curry we can create functions for >, <, ==, -, filter, head,
// tail, and more that we can use in this style--OR we can just use a library
// built with tacit programming in mind, and get all that for free. I'm sure
// you can guess at this point how subtract is implemented so lets use Ramda
// so we can fast-forward a bit.


// Get people over 60
var getPeopleOver60 = R.filter(function(person){
  return getAge(person) > 60
});

var getPeopleOver60 = R.filter(function(person){
  return R.gt((getAge(person), 60));
});

var getPeopleOver60 = R.filter(function(person){
  return R.compose(R.flip(R.gt)(60), getAge)(person);
});

// [Person] -> [Person]
var getPeopleOver60 = R.filter(R.compose(R.gt(R.__, 60), getAge));

console.log(getPeopleOver60(people));

//can't see everyone in the terminal so just give me the first names
console.log(R.map(R.prop('first'), getPeopleOver60(people)));
