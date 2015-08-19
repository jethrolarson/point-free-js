// [BCKW](https://en.wikipedia.org/wiki/B,C,K,W_system)
// compose
var B = f => g => a => f(g(a))

// flip
var C = f => a => b => f(b)(a)

// Const
var K = a => b => a

// apply arg twice
var W = f => a => f(a)(a)


// [SKI Combinators](https://en.wikipedia.org/wiki/SKI_combinator_calculus)
// S applies a to b after first substituting c into each of them. Or put another way,
// a is applied to b inside the environment c.

// Identity
var I = a => a

var S = a => b => c => a(c)(b(c))


// My extensions

//@see http://www.ucombinator.org
var U = (fn) => fn(fn)

// pipe
var P = C(B)

// Famous Y Combinator - It's basically a anonymous function vender. It takes a function that it will call
// passing a dynamically created function. Since a new function is created for each
// iteration of the recursion the stack doesn't grow.
// @see http://matt.might.net/articles/implementation-of-recursive-fixed-point-y-combinator-in-javascript-for-memoization
var Y = (F) =>
  ( (x) =>
    F((y) => x(x)(y))
  )( (x) =>
    F((y) => x(x)(y))
  )

module.exports = {U,B,K,W,C,I,Y,P}