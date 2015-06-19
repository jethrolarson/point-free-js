var log = console.log.bind(console);

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
getLastNames(people);
// => [Donahue, Yonath, Obama, Obama]

// One functional way would be to use map
var getLastNames = function(people) {
  return people.map(function(person) {
    return person.last;
  });
};
// Still works
getLastNames(people);
// => [Donahue, Yonath, Obama, Obama]

// That's less code but there's a little bit of boilerplate-y duplication here.
// Let's see if we can drop the inner function like we did before.

// First lets isolate the innermost function
var getPersonLastname = function (person) {
  return person.last;
};

// If you look at this at a high level this function doesn't have to care much 
// about what the object is. It just looks for the 'last' prop and returns that.

//So we can genericise this further:
var getLast = function (obj) {
  return obj.last;
};

//Now what if we want to make it even more generic?
var prop = function(key, obj) {
  return obj[key];
};

// That hasn't obviously helped our mapping function though sice we still have
// to pass person in...
var getLastNames = function(people) {
  return people.map(function(person) {
    return prop('last', person);
    // There is something else we can do though
  });
};

// What if prop was a function factory of sorts that returned a generic
// getter function?
var prop = function(key) {
  return function(obj){
    return obj[key];
  };
};

// Then you can use it like this:
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

// We can just inline this function in the map since it's so small.
var getLastNames = function(people) {
  return people.map(prop('last'));
};

// Let's do the same to [].map that we did to object.prop
// We want to stop talking about "people" so we'll take the mapping function
// first.
var map = function(fn){
    // return new function that takes our people
    return function(ar){
        // calls [].map
        return ar.map(fn);
    };
};

var getLastNames = function(people) {
  return map(prop('last'))(people);
};

// Now our map looks just like greet() again!

// Drop the inner function!
var getLastNames = map(prop('last'));

// Isn't that cool? we created a useful function from two meta functions and
// some static data ('last') without the `function` keyword.

//----

// One pitfall with writing functions this way is that you might get confused
// about what getLastNames actually accepts as arguments and what it returns.

// jsdoc can fill in the gaps, but if you want something more terse you can use
// this syntax adapted from haskell:

// getLastNames :: [Person] -> [String]
var getLastNames = map(prop('last'));
// I.e., getLastNames is a function that takes an array of "Person" objects and returns an
// array of strings. Now I know that 'Person' isn't a proper type, but it can be
// helpful to pretend that it is.

