// Lets say you have two functions, greet and hi. Greet returns a call to hi
// with the same argument.
var hi = function(str) {
  return "Hi " + str;
};

var greet = function(name) {
  return hi(name);
};

console.log(greet('Bob'));
// => Hi Bob

// if foo returns bar, you can drop the function body of foo.
var greet = hi;

//I'm lazy so I'll create an alias for console.log
var l = console.log.bind(console);

l(greet('Sally'));
// => Hi Sally

// The same works when you have more arguments.
var hiFormal = function(firstName, lastName) {
  return "Greetings, " + firstName + ' ' + lastName;
};

// I'm lazy so I'll use ES6 arrow functions:
var hiFormal = (firstName, lastName) =>
  "Greetings, " + firstName + ' ' + lastName
// Now I don't have to type out "function" and "return"

// I also won't be bothering with semi-colons. There's really only 2 cases where
// you need them(which we won't see), and even then you can put them at the
// begining of the line.

var greetFormal = (firstName, lastName)=> hiFormal(firstName, lastName)

l(greetFormal("Phil", "Donahue"))
// => Greetings, Phil Donahue

var greetFormal = hiFormal
l(greetFormal("Phil", "McCracken"))
// => Greetings, Phil McCracken

// So what if you need the arguments in another order?
var greetFormalRev = (lastName, firstName)=> hiFormal(firstName, lastName)

greetFormalRev('Obama', 'Barack')
// => Greetings, Barack Obama

// Lets write a meta-function
var flip = (fn) =>
  (...args) =>
    fn(...args.reverse())

//now we can just apply the meta-function to hiFormal
greetFormalRev = flip(hiFormal)
greetFormalRev('Obama', 'Michelle')
// => Greetings, Michelle Obama


/*
This is, in essense, what point-free programming is all about;
Using functional programming techniques to transform and restructure
arguments so that our functions don't need them anymore.

In this talk we'll dig into several examples where we drop arguments in
procedural JS and uncover a style of programming you may not have tried
before. We'll also explore a library that offers higher-order functions
to make this style of programming easier.
*/
