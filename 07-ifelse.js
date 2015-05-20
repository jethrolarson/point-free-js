function isCool(stewie){
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
var ifElse = require('ramda').ifElse;

var isCool = ifElse(
    hasHat,
    hasPiercing,
    hasShades
);
