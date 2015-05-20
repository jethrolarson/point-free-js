// Now suppose you wanted to instead just calculate the ages and augment the
// existing person objects with them. If you were doing this the normal way
// you'd be starting from scratch now, or figuring out some way to refactor.

var includeAges = map(function(p){
  p.age = getAge(p);
  return p;
});

//lets encapsulate the assignment
//FP purists may want to look away, we're mutating the object
var set = function(k){
  return function(v, o){
    o[k] = v;
    return o;
  };
};

includeAges = map(function(person) {
  return set('age')(getAge(person), person);
});
// Now we have both arguments of `set` getting p, though one is transformed
// by getAge. To drop person we'll need a function that can split one argument
// into 2 and transform them.

// Converge
// ----------
var converge = function(final, transform1, transform2) {
  return  function(x){
    return final(transform1(x), transform2(x));
  };
};
// converge(baz, foo, bar)(x) === baz(foo(x), bar(d))
// Basically it splits our argument into 2 by applying it to separate
// transform functions, then passing those results to the first function

/*
includeAges = map((p) {
  return converge(set('age'), getAge, p?));
};
*/
// Hm, p isn't a function
// We need a function that does nothing. That seems like a dumb thing to
// need but w/e.
var identity = function (a) {
  return a;
};

includeAges = map(converge(set('age'), getAge, identity));

log(includeAges(people));
