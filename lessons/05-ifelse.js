var {flip, log, compose, map, prop, eq} = require('../src/index')
var people = require('./people')

//Let's get all the first names and uppercase the presidents

var getFirstNamesCapPres = map((it) => {
    if (it.prefix == 'President') {
        return it.first.toUpperCase()
    } else {
        return it.first
    }
})
log(getFirstNamesCapPres(people));

// So now if we're going to squash this we'll need a function that captures the if/else

// ifElse takes a predicate, a function to call if predicate is true, and a function
// to call if false. Returned function passes it's argument to predicate and then
// calls either 2nd or 3rd function with the argument based on the predicate.

var ifElse = (pred, fn1, fn2) =>
    (x) => pred(x) ? fn1(x) : fn2(x)

// Now we just replace the if statement with ifElse and create functions for
// 3 parts
var getFirstNamesCapPres = map((it) =>
    ifElse(
        (it) => it.prefix == "President",
        (it) => it.first.toUpperCase(),
        (it) => it.first
    )(it)
)



// Lets use prop instead of dot
var getFirstNamesCapPres = map((it) =>
    ifElse(
        (it) => prop('prefix')(it) == "President",
        (it) => prop('first')(it).toUpperCase(),
        prop('first')
    )(it)
)

//convert toUpperCase to a normal function
var uppercase = (str) => str.toUpperCase()

//compose away the inner function
var getFirstNamesCapPres = map((it) =>
    ifElse(
        (it) => prop('prefix')(it) == "President",
        compose(uppercase, prop('first')),
        prop('first')
    )(it)
)(people)

var getFirstNamesCapPres = map((it) =>
    ifElse(
        (it) => eq("President")(prop('prefix')(it)),
        compose(uppercase, prop('first')),
        prop('first')
    )(it)
)

// compose awway the inside
var getFirstNamesCapPres = map((it) =>
    ifElse(
        compose(eq("President"), prop('prefix')),
        compose(uppercase, prop('first')),
        prop('first')
    )(it)
)

//drop parent function
var getFirstNamesCapPres = map(ifElse(
    compose(eq("President"), prop('prefix')),
    compose(uppercase, prop('first')),
    prop('first')
))

// As you may have noticed confirming that a prop equals some value is a very
// common case so we can create a helper.
//:: String -> a -> (Object -> Boolean)
var propEq = (key, val) => compose(eq(val), prop(key))

var getFirstNamesCapPres = map(ifElse(
    propEq('prefix', 'President'),
    compose(uppercase, prop('first')),
    prop('first')
))

// You probably noticed that you have to read compose functions right-to-left.
// This is nice because it makes the conversion from nested functions 
// natural.
// e.g. uppercase(prop('first')(it)) == compose(uppercase, prop('first'))(it)
// This can feel a little unnatural afterward though as it can be easier to read
// left-to-right top to bottom. We can create an alternative to compose that
// goes the other direction
var pipe = (g, f) => (x) => f(g(x))
// or
var pipe = flip(compose)

//then substitute compose in our above function
var getFirstNamesCapPres = map(ifElse(
    propEq('prefix', 'President'),
    pipe(prop('first'), uppercase),
    prop('first')
))

console.log(getFirstNamesCapPres(people))
//You can see the similarities next to our first version
var getFirstNamesCapPresOld = map((it) => {
    if(it.prefix == 'President'){
        return it.first.toUpperCase()
    } else {
        return it.first
    }
})

