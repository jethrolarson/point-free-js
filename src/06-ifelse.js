var R = require('ramda')
var people = require('./people')

//Let's get all the first names and uppercase the presidents

R.map((it)=>{
    if(it.prefix == 'President'){
        it.first.toUppercase()
    } else{
        it.first
    }
}, people)

// So now if we're going to squash this we'll need a function that captures the if/else

// ifElse takes a predicate, a function to call if predicate is true, and a function
// to call if false. Returned function passes it's argument to predicate and then
// calls either 2nd or 3rd function with the argument based on the predicate.

var ifElse = (pred, fn1, fn2)=>
    (x)=> pred(x) ? fn1(x) : fn2(x)

var uppercase = (str)=> str.toUppercase()

R.map((it)=>{
    ifElse(R.propEq('President', 'prefix'), uppercase, R.identity)(it)
}, people)

R.map(ifElse(R.propEq('President', 'prefix'), uppercase, R.identity), people)