//TODO rewrite this to be more interesting
var R = require('ramda');
var hasPiercing = R.has('piercing');
var hasShades = R.has('shades');
var hasHat = R.has('hat');

function isStewieCool(stewie){
    var out;
    if(hasHat(stewie)){
        out = hasPiercing(stewie);
    } else {
        out = hasShades(stewie);
    }
    return out;
}

// ifElse takes a predicate, a function to call if predicate is true, and function
// to call if false. Returned function passes it's argument to predicate and then
// calls either 2nd or 3rd function with the argument based on the predicate.

var ifElse = function(pred, fn1, fn2){
    return function(x){
        return pred(x) ? fn1(x) : fn2(x);
    }
};


var isCool = ifElse(
    hasHat,
    hasPiercing,
    hasShades
);

// Why did we care about stewie? Nothing in this function is even addressing the
// structure of what a "stewie" is so we can just stop talking about it!
