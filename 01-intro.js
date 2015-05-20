// Lets say you have two functions, greet and hi. Greet returns a call to hi
// with the same argument.
var hi = function(str){
  return "Hi " + str;
};

var greet = function(name) {
  return hi(name);
};

//alias log
var log = console.log.bind(console);

console.log(greet('Bob'));

// if foo returns bar, you can drop the function body of foo.
var greet = hi;
console.log(greet('Sally'));

// The same works when you have more arguments.
var hiFormal = function(firstName, lastName) {
  return "Greetings, " + firstName + ' ' + lastName;
};

var greetFormal = function(firstName, lastName) {
  return hiFormal(firstName, lastName);
};

console.log(greetFormal("Phil", "Donahue"));

var greetFormal = hiFormal;
console.log(greetFormal("Phil", "McCracken"));

// So what if you need the arguments in another order?
var greetFormalRev = function(lastName, firstName) {
  return  hiFormal(firstName, lastName);
};

log(greetFormal('Obama', 'Barack'));

// If we write a function that returns a function
// which calls the passed function with arguments reversed.
var flip = function(fn) {
  return function(a, b) {
    return fn(b, a);
  };
};

//...we can still drop the body
greetFormalRev = flip(hiFormal);
console.log(greetFormal('Obama', 'Michelle'));


/*
This is, in essense, what point-free programming is all about;
Using functional programming techniques to transform and restructure
arguments so that our functions don't need them anymore.

In this talk we'll dig into several examples where we drop arguments in
procedural JS and uncover a style of programming you may not have tried
before. We'll also explore a library that offers higher-order functions
to make this style of programming easier.
*/
