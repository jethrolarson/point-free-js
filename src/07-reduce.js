var R = require('ramda');
var people = require('./people')

// Lets try to sum the ages of our people.


// Best to do it with reduce
var reduce = R.curry((fn, start, ar)=> {
  var out = start
  for(var i = 0, len = ar.length; i < len; i++){
    out = fn(out, ar[i])
  }
  out
});

var sum = reduce(R.add, 0);
var product = reduce(R.multiply, 1);


// create a lookup table to get prefixes by id
var appendTo = R.curry((arr, it)=> {
  ar.push(it)
  ar
})

console.log(R.reduce((acc, it)=> {
  R.assoc(it.id, it.prefix, acc)
}, {}, people))

// our set from before, curried
var set = R.curry((k,v,o)=> {
  o[k] = v
  o
})

// R.reduce((acc, it)=>{
//   set(it.id, it.prefix, acc)
// }, {}, people)
