//http://matt.might.net/articles/implementation-of-recursive-fixed-point-y-combinator-in-javascript-for-memoization
var Y = (F) =>
  ( (x) =>
    F((y) => x(x)(y))
  )( (x) =>
    F((y) => x(x)(y))
  )

var factGen =  (fact) => n => n == 0 ? 1 : n * fact(n - 1)

console.log(Y(factGen)(6))

//How does this work?
// Y is basically a anonymous function vender. It takes a function that it will call with a dynamically created function.
// Since a new function is created for each iteration that is used for the recursion the stack doesn't grow.

var Ymem = (cache) => F => x => {
  if(typeof cache[x] === 'undefined') {
    cache[x] = (F( n =>
      Ymem(cache)(F)(n)
    ))(x)
  }
  return cache[x]
}

var fib = Ymem({})(g => n => ( n === 0 || n === 1) ? n : g(n - 1) + g(n - 2))

console.log(fib(100))