// Lets say you have two functions, greet and hi. Greet returns a call to hi
// with the same argument.
var hi = function(str){
  return "Hi " + str;
};

var greet = function(name) {
  return hi(name);
};

greet('Bob');
// => Hi Bob

// if foo returns bar, you can drop the function body of foo.
var greet = hi;
greet('Sally');
// => Hi Sally

// The same works when you have more arguments.
var hiFormal = function(firstName, lastName) {
  return "Greetings, " + firstName + ' ' + lastName;
};

var greetFormal = function(firstName, lastName) {
  return hiFormal(firstName, lastName);
};

greetFormal("Phil", "Donahue");
// => Greetings, Phil Donahue

var greetFormal = hiFormal;
greetFormal("Phil", "McCracken");
// => Greetings, Phil McCracken

// So what if you need the arguments in another order?
var greetFormalRev = function(lastName, firstName) {
  return  hiFormal(firstName, lastName);
};

greetFormalRev('Obama', 'Barack');
// => Greetings, Barack Obama

// Lets write a meta-function
var flip = function(fn) {
  //that returns a new function
  return function(a, b) {
    // that calls original function with arguments in opposite order.
    return fn(b, a);
  };
};

//now we can just apply the meta-function to hiFormal
greetFormalRev = flip(hiFormal);
greetFormal('Obama', 'Michelle');
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
