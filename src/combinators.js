// All of these functions are curried

// [BCKW](https://en.wikipedia.org/wiki/B,C,K,W_system)
// compose
//:: (b -> c) -> (a -> b) -> a -> c
var B = f => g => a => f(g(a))

// AKA flip
//:: (a -> b -> c) -> b -> a -> c
var C = f => a => b => f(b)(a)

// Const
//:: a -> b -> a
var K = a => b => a

// apply arg twice
//:: (a -> a -> b) -> a -> b
var W = f => a => f(a)(a)


// [SKI Combinators](https://en.wikipedia.org/wiki/SKI_combinator_calculus)

// Identity
//:: a -> a
var I = a => a

// S applies f to g after first substituting x into each of them. Or put another way,
// f is applied to g inside the environment x.
//:: (a -> b -> c) -> (a -> b) -> c
var S = f => g => x => f(x)(g(x))

//@see http://www.ucombinator.org
// U has a recursive type so there's no valid type signature.
var U = f => f(f)

// Y Combinator - Basically an anonymous function vender. It takes a function that it will call
// passing a dynamically created function. Since a new function is created for each
// iteration of the recursion the stack doesn't grow. This cannot be written in tacit style since the inner functions
// must be dynamically created. Y has a recursive type so there's no valid type signature.
// @see http://matt.might.net/articles/implementation-of-recursive-fixed-point-y-combinator-in-javascript-for-memoization
var Y = (f) =>
  ( (x) =>
    f((y) => x(x)(y))
  )((x) =>
    f((y) => x(x)(y))
  )

//Memoized Y Combinator
var Ymem = (cache) => F => x => {
  if(typeof cache[x] === 'undefined') {
    cache[x] = (F( n =>
      Ymem(cache)(F)(n)
    ))(x)
  }
  return cache[x]
}

// My extensions

// pipe
var P = C(B)

module.exports = {U,B,K,W,C,I,Y,P,Ymem}