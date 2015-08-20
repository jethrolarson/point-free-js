
//:: (a -> b) -> [a] -> [b]
const map = f => list => list.map(f)

//:: (a -> Boolean) -> [a] -> [a]
const filter = pred => list => list.filter(pred)

//:: (b -> a -> b) -> b -> [a] -> b
const reduce = fn => acc => list => list.reduce((acc, it)=> fn(acc)(it), acc)

const index = i => list => list[i]

module.exports = {map, filter, reduce, index}