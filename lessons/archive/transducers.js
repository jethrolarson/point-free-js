// FP toolbelt - everything curried
var {
  P, // pipe
  B, // compose
  C, // flip
  K  // const
} = require('../../combinators')
var reduce = fn => acc => list => list.reduce((acc, it)=> fn(acc)(it), acc)
// appendTo is the identity reducer for arrays
var appendTo = list => item => list.concat([item])
var ifElse = predicate => yay => doh => x => predicate(x) ? yay(x) : doh(x)

//map transduer as described http://phuu.net/2014/08/31/csp-and-transducers.html
function mapping(transform) {
    return function (reducer) {
        return function (acc, it) {
            return reducer(acc, transform(it));
        };
    };
}

// lets reduce it, currying fully
var mapping = transform => reducer => acc => it => reducer(acc)(transform(it))
var mapping = transform => reducer => acc => B(P(transform))(reducer(acc))
var mapping = transform => reducer => B(P(transform))(reducer)
var mapping = transform => B(P(transform))

// returns transducer - transducers take a reducer and return a reducer
// (a -> b) -> ((b -> a -> b) -> (b -> a -> b))
var mapping = B(B)(P)

var mapInc = mapping((a)=> a + 1)

console.log(reduce(mapInc(appendTo))([])([1,2,3,4]))

//create filtering transducer generator
function filtering(predicate) {
    return function (reducer) {
        return function (acc, it) {
            return (
                predicate(it) ?
                    reducer(acc, it) :
                    acc
            );
        };
    };
}

var filtering = predicate => reducer => acc => it =>
  predicate(it) ? reducer(acc)(it) : acc

var filtering = predicate => reducer => acc =>
  ifElse(predicate)(reducer(acc))(K(acc))

//I'm kind of stuck on reducing this function any further so I'll just move on and test it.


var filterGT2 = filtering(a => a > 2)

console.log(reduce(filterGT2(appendTo))([])([1,2,3,4]))

//compose em
var gt2Plus1 = B(mapInc)(filterGT2)
console.log(reduce(gt2Plus1(appendTo))([])([1,2,3,4]))


//reduce knows how to iterate but conceivably you can use the transducers anywhere you use a function like (b -> a -> b)

//Lets try transducing over numbers instead of arrays

// So we need an equivalent to reduce for normal values
var produce = (reducer) => (a) => (b) => reducer(a)(b)
// Hmm that's just
var produce = (reducer) => reducer
// so we can just use the reducer directly
// This makes sense because reduce was really only doing one thing for us.
// It was iterating over the array. For values we'll just be making on iteration.

// We need an equivalent to concat.
// addition is a decent combinator for numbers
var add = a => b => a + b
// [] is the identity value for concat
// 0 is the identity value for addition
var addUnit = 0

console.log(filterGT2(add)(addUnit)(3))

// can compose just as before
console.log(gt2Plus1(add)(addUnit)(3))