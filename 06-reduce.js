
// Lets try to sum the ages of our people.

// Easilly done with reduce
var reduce = curry(function(fn, start, ar){
  return ar.reduce(fn, start);
});

var sum = reduce(add, 0);

//We can just compose with our previous query function.
var sumAges = compose(sum, getAges);

// Unfortunately that will do two loops over the array. If we want to drop that
// to 1 we'll have to push the getAge into the reduce.

sumAges = reduce(function(acc, p) {
  return add(acc, getAge(p));
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
  useWith(
    add,
    identity, //grab accumulator directly
    getAge //pass p to getAge
  ),
  0
);

log(sumAges(people));


///////////////////////////////////


// Get the average of the people.

var divide = function(a, b) {
  return a / b;
};

// [Person] -> Number
getAverageAge = converge(divide, sumAges , prop('length'));

log(getAverageAge(people));

//TODO figure out this react case a little more.

// If we're using react for templating we can do some cool stuff.
D = require('react').DOM;
var applyWidgets = R.evolve({
  title: R.compose(translate, R.partial(D.b, {classname: 'title'})),
  dob: R.partial(D.date, {})
});
log(applyWidgets(people));


var personLayout = D.div({},[
  D.h2({},[
    prop('title'),
    prop('firstname'),
    prop('lastname')
  ]),
  prop('dob'),
  getAge
]);

render = R.compose(
  R.join(''),
  R.map(

  )
)
