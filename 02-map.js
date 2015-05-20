// jshint esnext:true

//Supose we have an array of people. Maybe this is the result of a ajax request.
var people = [
  {
    first: "Phil",
    last: "Donahue",
    prefix: "Mr.",
    dob: "December 21, 1935"
  },
  {
    first: "Ada",
    last: "Yonath",
    prefix: "Prof.",
    dob: "June, 22 1939"
  },
  {
    first: "Michelle",
    last: "Obama",
    prefix: "First Lady",
    dob: "January 17, 1964"
  },
  {
    first: "Barack",
    last: "Obama",
    prefix: "President",
    dob: "August 4, 1961"
  }
];

//What if we want to get an array of their last names?

// Here is a common way to do that
var getLastNames = function(people){
  var lastNames = [];
  for(var i = 0, len = people.length; i < len; i++){
    lastNames.push(people[i].last);
  }
  return lastNames;
};
log(getLastNames(people));

// The functional way would be to use map
var getLastNames = function(people) {
  return people.map(function(person) {
    return person.last;
  });
};
// Still works. And no, I'm not going to belabor the performance differences.
log(getLastNames(people));

// That's less code but there's a little bit of duplication here.
// Let's see if we can drop the inner function.

var getLast = function (person) {
  return person.last;
};

// There's really not a lot here. It doesn't seem like it's worth
// refactoring but lets try turning the '.' into a function.

var prop = function(key, obj) {
  return obj[key];
};

// That hasn't obviously helped our mapping function though...
var getLast = function(person) {
  return prop('last', person);
  // There is something else we can do though
};

// What if prop was a function factory of sorts that returned a generic
// getter function?
var prop = function(key) {
  return function(obj){
    return obj[key];
  };
};

var getLast = function(person) {
  return prop('last')(person);
};

// Does this look familiar?

//What if I renamed the variables?
var greet = function(name) {
  return hi('last')(name);
};

// Yes, this is just like our very first example. Which means we can drop
// the inner function!
var getLast = prop('last');

//The right part of this assignment is so small that I wouldn't bother
// introducing a new variable for it
var getLastNames = function(people) {
  return people.map(prop('last'));
};

// Let's do the same thing for map.
// I'm taking the mapping function first instead of the array, you'll see why
// in a second.
var map = function(fn){
    return function(ar){
        return ar.map(fn);
    };
};

var getLastNames = function(people) {
  return map(prop('last'))(people);
};

// Drop the inner function!
var getLastNames = map(prop('last'));

// At this point you might get confused about what getLastNames actually
// accepts as arguments and what it returns.

// Some jsdoc can fill in the gaps, but if you want something simpler you can
// use this syntax adapted from haskell:

// [Person] -> [String]
var getLastNames = map(prop('last'));
// I.e., this function takes an array of "Person" objects and returns an array
// of Strings. In our case here Person isn't a proper class, but this comment
// is enough to remind me what I can expect on it.
