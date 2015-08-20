var {compose, reduce, I, add, log, P} = require('../../src/index')

// Contrived case where there's too much nesting
var addTen = add(1)(add(2)(add(3)(add(4))))

// alright let's compose the nesting away
var addTen = compose(add(1), compose(add(2), compose(add(3), add(4))))
// aaaaahhhhh! that made it worse!
// Maybe if we compose an array of functions it'll be better...

//:: [..., (c -> b), (b -> a)] -> a -> c
var composeAll = reduce(P)(I)

var addTen = composeAll([add(1), add(2), add(3), add(4)])
//okay that'll do.

log(addTen(0))