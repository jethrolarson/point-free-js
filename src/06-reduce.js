var R = require('ramda');
var lesson3 = require('./03-compose');
var getAge = lesson3.getAge;
var getAges = lesson3.getAges;

// Lets try to sum the ages of our people.

// Easilly done with reduce
var reduce = R.curry(function(fn, start, ar){
  var out = start;
  for(var i = 0, len = ar.length; i < len; i++){
    out = fn(out, ar[i]);
  }
  return out;
});

var sum = reduce(R.add, 0);
var product = reduce(R.multiply, 1);

//We can just compose with our previous query function.
var sumAges = R.compose(sum, getAges);

// Unfortunately that will do two loops over the array. If we want to drop that
// to 1 we'll have to push the getAge into the reduce.

sumAges = reduce(function(acc, person) {
  return R.add(acc, getAge(person));
}, 0);

sumAges = reduce(function(acc, person) {
  return R.compose(R.add(acc), getAge)(person); //not helping, still can't get acc out
}, 0);

// We can't use converge to get rid of the argument because reduce's function
// receives 2 arguments, and add needs one of them transformed by getAge.

// This is a job for useWith (yeah, I know it's an odd name).
var useWith = function(final, fn1, fn2){
  return function(a, b){
    return final(fn1(a),fn2(b));
  };
};
// i.e. useWith(a, b, c)(1, 2) === a(b(1), c(2))


sumAges = reduce(
  function(acc, person) {
    return useWith(
      R.add,
      R.identity, //grab accumulator directly
      getAge //pass p to getAge
    )(acc, person);
  }, 0
);

sumAges = reduce(useWith(R.add, R.identity,getAge), 0);

var people = require('./people');
console.log(sumAges(people));


///////////////////////////////////


// Get the average of the people.

var divide = function(a, b) {
  return a / b;
};

// [Person] -> Number
getAverageAge = R.converge(divide, sumAges , R.prop('length'));

console.log(getAverageAge(people));
