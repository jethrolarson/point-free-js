var R = require('ramda')
// Unfortunately that will do two loops over the array. If we want to drop that
// to 1 we'll have to push the getAge into the R.reduce.

sumAges = R.reduce(function(acc, person) {
  return R.add(acc, getAge(person));
}, 0);

sumAges = R.reduce(function(acc, person) {
  return R.compose(R.add(acc), getAge)(person); //not helping, still can't get acc out
}, 0);

// We can't use converge to get rid of the argument because R.reduce's function
// receives 2 arguments, and add needs one of them transformed by getAge.

// This is a job for useWith (yeah, I know it's an odd name).
var useWith = function(final, fn1, fn2){
  return function(a, b){
    return final(fn1(a),fn2(b));
  };
};
// i.e. useWith(a, b, c)(1, 2) === a(b(1), c(2))


sumAges = R.reduce(
  function(acc, person) {
    return useWith(
      R.add,
      R.identity, //grab accumulator directly
      getAge //pass p to getAge
    )(acc, person);
  }, 0
);

sumAges = R.reduce(useWith(R.add, R.identity,getAge), 0);

var people = require('./people');
console.log(sumAges(people));
