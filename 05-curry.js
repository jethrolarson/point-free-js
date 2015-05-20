
// Get people ages multiplied by 2

//Start with naive FP approach
var getDoubledAges = function(people){
  return map(function(age){
    return age * 2;
  })(getAges(people));
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

// Fortunately a number of libraries are popping up now with auto-curry.
// My favorite of which is Ramda.
var R = require('ramda');

// This flavor of curry takes a function and returns one that will call the
// passed function once it has all its arguments. The implementation is a
// little complex to step through the way I've done with other functions so
// you'll have to take this on faith.

var multiply = R.curry(multiply);

// Now these are the same.
multiply(2)(3) === multply(2, 3)

//Back to our original challenge, we're doubling some ages.
var getDoubledAges = function(people){
  return map(multiply(2))(getAges(people));
};

//To eliminate "people" we have to unnest the functions using compose
var getDoubledAges = function(people){
  return compose(
    map(multiply(2)),
    getAges
  )(people);
};

// kill the inner function!
var getDoubledAges = compose(
  map(multiply(2)),
  getAges
);

// Nice!
// You may notice that this loops over people twice.
// Since we've been building reusable functions this whole time we can refactor
// this super easilly.

// [Person] -> [Number]
var getDoubledAges = map(
  compose(multiply(2), getAge)
);

// Double nice!

// With the power of R.curry we can create functions for >, <, ==, -, filter, head,
// tail, and more that we can use in this style--OR we can just use a library
// built with tacit programming in mind, and get all that for free. I'm sure
// you can guess at this point how subtract is implemented so lets use Ramda
// so we can fast-forward a bit.


// Get people over 50
// [Person] -> [Person]
var getPeopleOver50 = R.filter(
  compose(R.gt(50), getAge)
);
