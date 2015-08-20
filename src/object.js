const {eq} = require('./logic')
const {B, P} = require('./combinators')
const {reduce} = require('./list')

//:: String -> a -> {} -> {}
const set = k => v => o => {
  o[k] = v
  return o
}

const del = k => o => {
  delete o[k]
  return o
}

const clone = o => {
  var copy = {}
  for(var kk in o){
    if(o.hasOwnProperty(kk)){
      copy[kk] = o[kk]
    }
  }
  copy.prototype = o.prototype
  return o
}

//clone object p and then copy all properties of object o to clone
//:: {} -> {} -> {}
const extend = o => p => {
  var copy = clone(p)
  for(var kk in o){
    if(o.hasOwnProperty(kk)){
      copy[kk] = o[kk]
    }
  }
  copy.prototype = p.prototype
  return copy
};

//:: [{}] -> {}
const extendAll = reduce(extend)({})

//:: String -> a -> {} -> {}
const assoc = B(B(P(clone)))(set)

//:: String -> {} -> {}
const dissoc = B(P(clone))(del)

//:: String -> {} -> a
const prop = key =>
  obj => obj[key]

//:: String -> a -> (Object -> Boolean)
const propEq = key => val => o => o[key] === val

module.exports = {clone, extend, extendAll, assoc, dissoc, set, del, prop, propEq}